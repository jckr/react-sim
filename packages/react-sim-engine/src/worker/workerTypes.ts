import type { EngineConfig, EngineSnapshot } from '../types';

/**
 * Worker-friendly engine config.
 *
 * NOTE: For this initial demo-focused implementation, `initData` and `updateData`
 * are provided as *stringified function expressions* so they can be instantiated
 * inside the worker. In a production-grade system you would load simulation
 * modules in the worker instead.
 */
export type WorkerEngineConfig<Data, Params extends object, Result> = Omit<
  EngineConfig<Data, Params, Result>,
  'initData' | 'updateData'
> & {
  initDataSource: string; // e.g. "(params) => ...", "(params, ctx) => ..."
  updateDataSource: string; // e.g. "({ data, params, tick, cachedData }) => ({status:'continue', data: ...})"
};

export type SnapshotListener<Data, Params extends object, Result> = (
  snapshot: EngineSnapshot<Data, Params, Result>
) => void;

