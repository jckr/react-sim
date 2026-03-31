import React from 'react';
import type { EngineConfig, EngineSnapshot, Tick } from 'react-sim-engine/types';
import type { SimulationModuleRef } from 'react-sim-engine/runner/module-types';
import { createDefaultModuleWorker, createWorkerSimulationRunner } from 'react-sim-engine/runner/worker';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextRuntimeValue } from './SimulationContext';
import { useStableCallback } from './stableCallback';

type CanvasLease = {
  runner: Awaited<ReturnType<typeof createWorkerSimulationRunner<unknown, object, unknown>>>;
  disposeTimer: number | null;
  refCount: number;
};

const canvasLeases = new WeakMap<HTMLCanvasElement, CanvasLease>();

export type WorkerSimulationProps<Data, Params extends object, Result = unknown> = {
  module: SimulationModuleRef;
  config: Omit<EngineConfig<Data, Params, Result>, 'initData' | 'updateData'>;
  children?: React.ReactNode;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  workerFactory?: () => Worker;
};

export function WorkerSimulation<Data, Params extends object, Result = unknown>(props: WorkerSimulationProps<Data, Params, Result>) {
  const workerFactory = props.workerFactory ?? (() => createDefaultModuleWorker());

  const runnerRef = React.useRef<Awaited<ReturnType<typeof createWorkerSimulationRunner<Data, Params, Result>>> | null>(null);
  const didAttachCanvasRef = React.useRef(false);
  const [snapshot, setSnapshot] = React.useState<EngineSnapshot<Data, Params, Result> | null>(null);

  React.useEffect(() => {
    let disposed = false;
    const canvasEl = props.canvasRef?.current ?? null;
    const existingLease = canvasEl ? canvasLeases.get(canvasEl) : undefined;

    if (existingLease) {
      existingLease.refCount += 1;
      if (existingLease.disposeTimer !== null) {
        window.clearTimeout(existingLease.disposeTimer);
        existingLease.disposeTimer = null;
      }
      runnerRef.current = existingLease.runner as typeof runnerRef.current;
      void existingLease.runner.getSnapshot().then((snap) => {
        if (!disposed) setSnapshot(snap as unknown as EngineSnapshot<Data, Params, Result>);
      });
      return () => {
        disposed = true;
        existingLease.refCount -= 1;
        if (existingLease.refCount === 0 && existingLease.disposeTimer === null) {
          existingLease.disposeTimer = window.setTimeout(() => {
            existingLease.runner.dispose();
            canvasLeases.delete(canvasEl as HTMLCanvasElement);
          }, 0);
        }
      };
    }

    const worker = workerFactory();

    (async () => {
      const runner = await createWorkerSimulationRunner<Data, Params, Result>({
        worker,
        module: props.module,
        config: props.config,
        onSnapshot: (snap) => {
          if (!disposed) setSnapshot(snap);
        }
      });

      runnerRef.current = runner;

      const attachCanvasIfReady = () => {
        if (didAttachCanvasRef.current) return true;
        const el = props.canvasRef?.current ?? null;
        if (!el) return false;
        runner.setCanvasFromElement(el);
        didAttachCanvasRef.current = true;
        canvasLeases.set(el, {
          runner: runner as unknown as CanvasLease['runner'],
          disposeTimer: null,
          refCount: 1
        });
        return true;
      };

      if (!attachCanvasIfReady() && props.canvasRef) {
        let raf = 0;
        const loop = () => {
          if (disposed) return;
          if (attachCanvasIfReady()) return;
          raf = window.requestAnimationFrame(loop);
        };
        raf = window.requestAnimationFrame(loop);
      }

      const initial = await runner.getSnapshot();
      if (!disposed) setSnapshot(initial);
    })().catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });

    return () => {
      disposed = true;
      didAttachCanvasRef.current = false;
      if (canvasEl) {
        const lease = canvasLeases.get(canvasEl);
        if (lease) {
          lease.refCount -= 1;
          if (lease.refCount === 0 && lease.disposeTimer === null) {
            lease.disposeTimer = window.setTimeout(() => {
              lease.runner.dispose();
              canvasLeases.delete(canvasEl);
            }, 0);
          }
        }
      } else {
        runnerRef.current?.dispose();
      }
      runnerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useStableCallback(() => runnerRef.current?.play());
  const pause = useStableCallback(() => runnerRef.current?.pause());
  const stop = useStableCallback(() => runnerRef.current?.stop());
  const seek = useStableCallback((t: Tick) => runnerRef.current?.seek(t));
  const stepOnce = useStableCallback((count?: number) => runnerRef.current?.stepOnce(count));
  const setParams = useStableCallback((next: object, opts?: { reset?: boolean }) =>
    runnerRef.current?.setParams(next as Partial<Params>, opts)
  );

  const baseTick = props.config.minTime ?? props.config.initialTick ?? 0;
  const runtimeSnapshot: EngineSnapshot<Data, Params, Result> =
    snapshot ??
    ({
      data: (props.config.initialData ?? null) as Data,
      tick: baseTick,
      params: props.config.initialParams,
      results: [] as Result[],
      isPlaying: false,
      canPlay: false
    } satisfies EngineSnapshot<Data, Params, Result>);

  const value = React.useMemo((): SimulationContextRuntimeValue => {
    return {
      data: runtimeSnapshot.data,
      tick: runtimeSnapshot.tick,
      params: runtimeSnapshot.params,
      cachedData: {} as Record<number, unknown>,
      results: runtimeSnapshot.results,
      isPlaying: runtimeSnapshot.isPlaying,
      canPlay: runtimeSnapshot.canPlay,
      play: () => play(),
      pause: () => pause(),
      stop: () => stop(),
      seek: (t) => seek(t),
      stepOnce: (c) => stepOnce(c),
      setParams
    };
  }, [pause, play, runtimeSnapshot, seek, setParams, stepOnce, stop]);

  return <SimulationContext.Provider value={value}>{props.children}</SimulationContext.Provider>;
}

