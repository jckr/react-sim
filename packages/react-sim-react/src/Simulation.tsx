import React from 'react';
import type { EngineConfig } from 'react-sim-engine/types';
import { createSimulationEngine } from 'react-sim-engine';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextRuntimeValue } from './SimulationContext';
import { useStableCallback } from './stableCallback';

export type SimulationProps<Data, Params extends object, Result = unknown> = {
  initData: EngineConfig<Data, Params, Result>['initData'];
  updateData: EngineConfig<Data, Params, Result>['updateData'];
  /**
   * Engine options (initialTick, minTime, maxTime, delayMs, loop, etc.).
   * `initData` / `updateData` are passed as top-level props above.
   */
  config: Omit<EngineConfig<Data, Params, Result>, 'initData' | 'updateData'>;
  children?: React.ReactNode;
};

export function Simulation<Data, Params extends object, Result = unknown>(
  props: SimulationProps<Data, Params, Result>
) {
  const { initData, updateData, config, children } = props;

  const engineRef = React.useRef<ReturnType<typeof createSimulationEngine<Data, Params, Result>> | null>(
    null
  );

  if (!engineRef.current) {
    engineRef.current = createSimulationEngine<Data, Params, Result>({
      ...config,
      initData,
      updateData
    });
  }
  const engine = engineRef.current;

  const [snapshot, setSnapshot] = React.useState(() => engine.getSnapshot());

  React.useEffect(() => engine.subscribe((next) => setSnapshot(next)), [engine]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      return;
    }

    let rafId = 0;
    const loop = (now: number) => {
      engine.handleAnimationFrame(now);
      rafId = window.requestAnimationFrame(loop);
    };
    rafId = window.requestAnimationFrame(loop);

    return () => window.cancelAnimationFrame(rafId);
  }, [engine]);

  const cachedData = engine.getCachedData();

  const play = useStableCallback(() => engine.play());
  const pause = useStableCallback(() => engine.pause());
  const stop = useStableCallback(() => engine.stop());
  const seek = useStableCallback((t: number) => engine.seek(t));
  const stepOnce = useStableCallback((count?: number) => engine.stepOnce(count));
  /** `(object, …)` matches `SimulationContextRuntimeValue`; engine still needs `Partial<Params>`. */
  const setParams = useStableCallback((next: object, opts?: { reset?: boolean }) =>
    engine.setParams(next as Partial<Params>, opts)
  );

  const value = React.useMemo((): SimulationContextRuntimeValue => {
    return {
      data: snapshot.data,
      tick: snapshot.tick,
      params: snapshot.params,
      cachedData,
      results: snapshot.results,
      isPlaying: snapshot.isPlaying,
      canPlay: snapshot.canPlay,
      play,
      pause,
      stop,
      seek,
      stepOnce,
      setParams
    };
  }, [cachedData, pause, play, seek, setParams, snapshot, stepOnce, stop]);

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}
