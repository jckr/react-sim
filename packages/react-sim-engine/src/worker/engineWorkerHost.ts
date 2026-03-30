import { wrap, proxy } from 'comlink';
import type { WorkerEngineConfig } from './workerTypes';
import type { EngineSnapshot } from '../types';

export type EngineWorkerClient<Data, Params extends object, Result> = {
  createEngine: (config: WorkerEngineConfig<Data, Params, Result>) => Promise<boolean>;
  subscribeSnapshot: (cb: (snapshot: EngineSnapshot<Data, Params, Result>) => void) => void;
  getSnapshot: () => EngineSnapshot<Data, Params, Result>;
  getCachedData: () => Record<number, Data>;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: number) => void;
  setParams: (nextParams: Record<string, unknown>, opts?: { reset?: boolean }) => void;
};

export async function createEngineWorkerHost<Data, Params extends object, Result>(
  worker: Worker,
  config: WorkerEngineConfig<Data, Params, Result>,
  onSnapshot?: (snapshot: EngineSnapshot<Data, Params, Result>) => void
) {
  const api = wrap<EngineWorkerClient<Data, Params, Result>>(worker);

  await api.createEngine(config);
  if (onSnapshot) {
    api.subscribeSnapshot(proxy(onSnapshot));
  }

  return api;
}

