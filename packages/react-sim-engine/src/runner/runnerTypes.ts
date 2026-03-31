import type { EngineSnapshot, Tick } from '../types';

export type Unsubscribe = () => void;

export type SimulationRunner<Data, Params extends object, Result = unknown> = {
  init: () => void;
  dispose: () => void;

  getSnapshot: () => Promise<EngineSnapshot<Data, Params, Result>>;
  getCachedData: () => Promise<Record<number, Data>>;

  subscribe: (listener: (snapshot: EngineSnapshot<Data, Params, Result>) => void) => Unsubscribe;

  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: Tick) => void;
  stepOnce: (count?: number) => void;
  setParams: (nextParams: Partial<Params>, opts?: { reset?: boolean }) => void;
};
