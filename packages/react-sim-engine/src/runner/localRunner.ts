import { createSimulationEngine } from '../engine';
import type { EngineConfig } from '../types';
import type { SimulationRunner } from './runnerTypes';

export function createLocalSimulationRunner<Data, Params extends object, Result = unknown>(
  config: EngineConfig<Data, Params, Result>
): SimulationRunner<Data, Params, Result> {
  const engine = createSimulationEngine(config);

  return {
    init: () => {
      // `createSimulationEngine` initializes eagerly.
    },
    dispose: () => {
      // no-op for local runner
    },
    getSnapshot: async () => engine.getSnapshot(),
    getCachedData: async () => engine.getCachedData(),
    subscribe: (listener) => engine.subscribe(listener),
    play: () => engine.play(),
    pause: () => engine.pause(),
    stop: () => engine.stop(),
    seek: (tick) => engine.seek(tick),
    stepOnce: (count) => engine.stepOnce(count),
    setParams: (next, opts) => engine.setParams(next, opts)
  };
}
