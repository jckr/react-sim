import React from 'react';
import type { EngineConfig, Tick } from 'react-sim-engine/types';
import type { SimulationModuleRef } from 'react-sim-engine/runner/module-types';
import type { RenderStateSnapshot } from 'react-sim-engine/runner/worker-render-state';
import { createDefaultRenderStateWorker, createWorkerRenderStateRunner } from 'react-sim-engine/runner/worker-render-state';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextRuntimeValue } from './SimulationContext';
import { useStableCallback } from './stableCallback';

export type WorkerRenderSimulationProps<Data, Params extends object, RenderState = Data, Result = unknown> = {
  module: SimulationModuleRef;
  config: Omit<EngineConfig<Data, Params, Result>, 'initData' | 'updateData'>;
  children?: React.ReactNode;
  workerFactory?: () => Worker;
};

function unwrapDataOrRenderState<Data, RenderState>(
  envelope: RenderStateSnapshot<Data, object, RenderState, unknown>['envelope']
): { data: Data | RenderState } {
  if (envelope.kind === 'renderState') return { data: envelope.renderState };
  return { data: envelope.data };
}

/**
 * Hosts a worker-backed engine. The `SimulationContext` `data` field is the **union** of full `Data` and
 * `RenderState` (see `unwrapDataOrRenderState`). Prefer `useWorkerRenderSimulationContext` from `react-sim-react/hooks`
 * so TypeScript carries that union.
 */
export function WorkerRenderSimulation<Data, Params extends object, RenderState = Data, Result = unknown>(
  props: WorkerRenderSimulationProps<Data, Params, RenderState, Result>
) {
  const workerFactory = props.workerFactory ?? (() => createDefaultRenderStateWorker());

  const runnerRef = React.useRef<Awaited<ReturnType<typeof createWorkerRenderStateRunner<Data, Params, RenderState, Result>>> | null>(
    null
  );

  const [snapshot, setSnapshot] = React.useState<RenderStateSnapshot<Data, Params, RenderState, Result> | null>(null);

  React.useEffect(() => {
    let disposed = false;
    const worker = workerFactory();

    (async () => {
      const runner = await createWorkerRenderStateRunner<Data, Params, RenderState, Result>({
        worker,
        module: props.module,
        config: props.config,
        onSnapshot: (snap) => {
          if (!disposed) setSnapshot(snap);
        }
      });

      runnerRef.current = runner;
      const initial = await runner.getSnapshot();
      if (!disposed) setSnapshot(initial);
    })().catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });

    return () => {
      disposed = true;
      runnerRef.current?.dispose();
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
    runnerRef.current?.setParams(next as Record<string, unknown>, opts)
  );

  const baseTick = props.config.minTime ?? props.config.initialTick ?? 0;

  const runtimeSnapshot: RenderStateSnapshot<Data, Params, RenderState, Result> =
    snapshot ??
    ({
      tick: baseTick,
      params: props.config.initialParams,
      results: [] as Result[],
      isPlaying: false,
      canPlay: false,
      envelope: { kind: 'data', data: (props.config.initialData ?? null) as Data }
    } satisfies RenderStateSnapshot<Data, Params, RenderState, Result>);

  const { data } = unwrapDataOrRenderState<Data, RenderState>(runtimeSnapshot.envelope as never);

  const value = React.useMemo((): SimulationContextRuntimeValue => {
    return {
      data,
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
  }, [data, pause, play, runtimeSnapshot, seek, setParams, stepOnce, stop]);

  return <SimulationContext.Provider value={value}>{props.children}</SimulationContext.Provider>;
}

