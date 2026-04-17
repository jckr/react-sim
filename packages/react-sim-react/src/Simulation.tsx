import React from 'react';
import type { SimModule } from 'react-sim-engine/sim';
import { createEngine } from 'react-sim-engine';
import type { SimulationEngine, EngineSnapshot } from 'react-sim-engine';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextValue } from './SimulationContext';
import { useStableCallback } from './stableCallback';

type SimulationPropsLocal<Data, Params> = {
  sim: SimModule<Data, Params>;
  worker?: never;
  params?: Partial<Params>;
  maxTime?: number;
  delayMs?: number;
  ticksPerFrame?: number;
  autoplay?: boolean;
  children?: React.ReactNode;
};

type SimulationPropsWorker<Data, Params> = {
  sim?: never;
  worker: () => Promise<{ default: SimModule<Data, Params> }>;
  params?: Partial<Params>;
  maxTime?: number;
  delayMs?: number;
  ticksPerFrame?: number;
  snapshotIntervalMs?: number;
  autoplay?: boolean;
  children?: React.ReactNode;
};

export type SimulationProps<Data, Params> =
  | SimulationPropsLocal<Data, Params>
  | SimulationPropsWorker<Data, Params>;

/**
 * Common interface for both engine (main-thread) and worker-backed runner.
 */
type Backend<Data, Params> = {
  getSnapshot: () => EngineSnapshot<Data, Params>;
  subscribe: (
    listener: (snapshot: EngineSnapshot<Data, Params>) => void
  ) => () => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: number) => void;
  advance: (count?: number) => void;
  setParams: (patch: Partial<Params>) => void;
  resetWith: (patch?: Partial<Params>) => void;
  destroy: () => void;
  handleAnimationFrame?: (nowMs: number) => void;
};

// ---------------------------------------------------------------------------
// Local (main-thread) Simulation
// ---------------------------------------------------------------------------

function LocalSimulation<Data, Params>(
  props: SimulationPropsLocal<Data, Params>
) {
  const { sim, params: paramsProp, children, autoplay } = props;

  const engineRef = React.useRef<SimulationEngine<Data, Params> | null>(null);

  if (!engineRef.current) {
    const initialParams = paramsProp
      ? { ...sim.defaultParams, ...paramsProp }
      : sim.defaultParams;

    engineRef.current = createEngine<Data, Params>({
      init: sim.init,
      step: sim.step,
      shouldStop: sim.shouldStop,
      initialParams,
      maxTime: props.maxTime,
      delayMs: props.delayMs,
      ticksPerFrame: props.ticksPerFrame,
    });
  }
  const engine = engineRef.current;

  const [snapshot, setSnapshot] = React.useState(() => engine.getSnapshot());

  React.useEffect(() => engine.subscribe((next) => setSnapshot(next)), [engine]);

  React.useEffect(() => {
    if (autoplay) engine.play();
  }, [engine, autoplay]);

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (paramsProp) engine.setParams(paramsProp);
  }, [engine, paramsProp]);

  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.requestAnimationFrame !== 'function'
    )
      return;

    let rafId = 0;
    const loop = (now: number) => {
      engine.handleAnimationFrame(now);
      rafId = window.requestAnimationFrame(loop);
    };
    rafId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(rafId);
  }, [engine]);

  return (
    <SimulationProvider snapshot={snapshot} backend={engine}>
      {children}
    </SimulationProvider>
  );
}

// ---------------------------------------------------------------------------
// Worker-backed Simulation
// ---------------------------------------------------------------------------

function WorkerSimulation<Data, Params>(
  props: SimulationPropsWorker<Data, Params>
) {
  const { children, autoplay } = props;
  const [backend, setBackend] = React.useState<Backend<Data, Params> | null>(
    null
  );
  const [snapshot, setSnapshot] = React.useState<EngineSnapshot<
    Data,
    Params
  > | null>(null);

  const propsRef = React.useRef(props);
  propsRef.current = props;

  React.useEffect(() => {
    let cancelled = false;
    let runner: Backend<Data, Params> | null = null;

    (async () => {
      const mod = await propsRef.current.worker();
      const simModule = mod.default;
      if (cancelled) return;

      const p = propsRef.current;
      const initialParams = p.params
        ? { ...simModule.defaultParams, ...p.params }
        : simModule.defaultParams;

      const engine = createEngine<Data, Params>({
        init: simModule.init,
        step: simModule.step,
        shouldStop: simModule.shouldStop,
        initialParams,
        maxTime: p.maxTime,
      });

      if (cancelled) {
        engine.destroy();
        return;
      }

      // Worker-mode tick loop: setTimeout-driven, decoupled from RAF
      const delayMs = p.delayMs ?? 0;
      const ticksPerFrame = p.ticksPerFrame ?? 1;
      let loopTimer: ReturnType<typeof setTimeout> | null = null;

      function stopLoop() {
        if (loopTimer !== null) {
          clearTimeout(loopTimer);
          loopTimer = null;
        }
      }

      function tickLoop() {
        if (engine.getStatus() !== 'playing') return;

        for (let i = 0; i < ticksPerFrame; i++) {
          engine.advance(1);
          const s = engine.getStatus();
          if (s === 'stopped') return;
          if (s !== 'paused') break;
        }

        if (engine.getStatus() === 'paused') {
          engine.play();
        }

        loopTimer = setTimeout(tickLoop, delayMs);
      }

      runner = {
        getSnapshot: () => engine.getSnapshot(),
        subscribe: (listener) => engine.subscribe(listener),
        play: () => {
          engine.play();
          stopLoop();
          loopTimer = setTimeout(tickLoop, 0);
        },
        pause: () => {
          stopLoop();
          engine.pause();
        },
        stop: () => {
          stopLoop();
          engine.stop();
        },
        seek: (tick) => {
          stopLoop();
          engine.seek(tick);
        },
        advance: (count) => engine.advance(count),
        setParams: (patch) => engine.setParams(patch),
        resetWith: (patch) => {
          stopLoop();
          engine.resetWith(patch);
        },
        destroy: () => {
          stopLoop();
          engine.destroy();
        },
      };

      if (!cancelled) {
        setBackend(runner);
        setSnapshot(engine.getSnapshot());
      }
    })();

    return () => {
      cancelled = true;
      runner?.destroy();
    };
  }, []);

  // Subscribe to snapshots
  React.useEffect(() => {
    if (!backend) return;
    return backend.subscribe((next) => setSnapshot(next));
  }, [backend]);

  // Autoplay when backend becomes available
  React.useEffect(() => {
    if (autoplay && backend) backend.play();
  }, [backend, autoplay]);

  // Live-apply params
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (props.params && backend) backend.setParams(props.params);
  }, [backend, props.params]);

  if (!snapshot || !backend) return null;

  return (
    <SimulationProvider snapshot={snapshot} backend={backend}>
      {children}
    </SimulationProvider>
  );
}

// ---------------------------------------------------------------------------
// Shared context provider
// ---------------------------------------------------------------------------

function SimulationProvider<Data, Params>({
  snapshot,
  backend,
  children,
}: {
  snapshot: EngineSnapshot<Data, Params>;
  backend: Backend<Data, Params>;
  children?: React.ReactNode;
}) {
  const play = useStableCallback(() => backend.play());
  const pause = useStableCallback(() => backend.pause());
  const stop = useStableCallback(() => backend.stop());
  const seek = useStableCallback((t: number) => backend.seek(t));
  const advance = useStableCallback((count?: number) => backend.advance(count));
  const setParams = useStableCallback((patch: Partial<Params>) =>
    backend.setParams(patch)
  );
  const resetWith = useStableCallback((patch?: Partial<Params>) =>
    backend.resetWith(patch)
  );

  const value = React.useMemo(
    (): SimulationContextValue<Data, Params> => ({
      data: snapshot.data,
      params: snapshot.params,
      tick: snapshot.tick,
      status: snapshot.status,
      play,
      pause,
      stop,
      seek,
      advance,
      setParams,
      resetWith,
    }),
    [snapshot, play, pause, stop, seek, advance, setParams, resetWith]
  );

  return (
    <SimulationContext.Provider
      value={value as SimulationContextValue<unknown, unknown>}
    >
      {children}
    </SimulationContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Public component — dispatches to local or worker implementation
// ---------------------------------------------------------------------------

export function Simulation<Data, Params>(
  props: SimulationProps<Data, Params>
) {
  if ('worker' in props && props.worker != null) {
    return <WorkerSimulation {...(props as SimulationPropsWorker<Data, Params>)} />;
  }
  return <LocalSimulation {...(props as SimulationPropsLocal<Data, Params>)} />;
}
