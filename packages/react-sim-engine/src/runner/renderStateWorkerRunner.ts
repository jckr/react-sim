import type { Remote } from 'comlink';
import { proxy, wrap } from 'comlink';
import type { Tick } from '../types';
import type { SimulationModuleRef } from './moduleTypes';

export type RenderStateEnvelope<RenderState, Data> =
  | { kind: 'renderState'; renderState: RenderState }
  | { kind: 'data'; data: Data };

export type RenderStateSnapshot<Data, Params extends object, RenderState, Result> = {
  tick: Tick;
  params: Params;
  isPlaying: boolean;
  canPlay: boolean;
  results: Result[];
  envelope: RenderStateEnvelope<RenderState, Data>;
};

export type RenderStateWorkerClient<Data, Params extends object, RenderState, Result> = {
  createFromModule: (config: {
    module: SimulationModuleRef;
    initialParams: Params;
    initialTick?: Tick;
    minTime?: Tick;
    maxTime?: Tick;
    delayMs?: number;
    ticksPerAnimation?: number;
    loop?: boolean;
    noCache?: boolean;
    context?: unknown;
  }) => Promise<boolean>;
  subscribeSnapshot: (cb: (snapshot: RenderStateSnapshot<Data, Params, RenderState, Result>) => void) => number;
  unsubscribeSnapshot: (id: number) => void;
  getSnapshot: () => Promise<RenderStateSnapshot<Data, Params, RenderState, Result>>;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: Tick) => void;
  stepOnce: (count?: number) => void;
  setParams: (nextParams: Record<string, unknown>, opts?: { reset?: boolean }) => void;
};

export type RenderStateWorkerRunner<Data, Params extends object, RenderState, Result> = {
  dispose: () => void;
  getSnapshot: () => Promise<RenderStateSnapshot<Data, Params, RenderState, Result>>;
  subscribe: (listener: (snapshot: RenderStateSnapshot<Data, Params, RenderState, Result>) => void) => () => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: Tick) => void;
  stepOnce: (count?: number) => void;
  setParams: (nextParams: Record<string, unknown>, opts?: { reset?: boolean }) => void;
};

export function createDefaultRenderStateWorker(): Worker {
  const baseUrl = import.meta.url;
  if (!baseUrl) {
    throw new Error('createDefaultRenderStateWorker requires ESM (import.meta.url)');
  }
  const url = new URL('../worker/renderStateWorker.js', baseUrl);
  return new Worker(url, { type: 'module' });
}

export async function createWorkerRenderStateRunner<Data, Params extends object, RenderState = Data, Result = unknown>(opts: {
  worker: Worker;
  module: SimulationModuleRef;
  config: {
    initialParams: Params;
    initialTick?: Tick;
    minTime?: Tick;
    maxTime?: Tick;
    delayMs?: number;
    ticksPerAnimation?: number;
    loop?: boolean;
    noCache?: boolean;
    context?: unknown;
  };
  onSnapshot?: (snapshot: RenderStateSnapshot<Data, Params, RenderState, Result>) => void;
}): Promise<RenderStateWorkerRunner<Data, Params, RenderState, Result>> {
  const api = wrap<RenderStateWorkerClient<Data, Params, RenderState, Result>>(
    opts.worker
  ) as Remote<RenderStateWorkerClient<Data, Params, RenderState, Result>>;

  await api.createFromModule({
    module: opts.module,
    initialParams: opts.config.initialParams,
    initialTick: opts.config.initialTick,
    minTime: opts.config.minTime,
    maxTime: opts.config.maxTime,
    delayMs: opts.config.delayMs,
    ticksPerAnimation: opts.config.ticksPerAnimation,
    loop: opts.config.loop,
    noCache: opts.config.noCache,
    context: opts.config.context
  });

  if (opts.onSnapshot) {
    void api.subscribeSnapshot(proxy(opts.onSnapshot));
  }

  return {
    dispose: () => {
      opts.worker.terminate();
    },
    getSnapshot: async () => await api.getSnapshot(),
    subscribe: (listener) => {
      const idP = api.subscribeSnapshot(proxy(listener));
      return () => {
        void idP.then((id) => api.unsubscribeSnapshot(id));
      };
    },
    play: () => void api.play(),
    pause: () => void api.pause(),
    stop: () => void api.stop(),
    seek: (tick) => void api.seek(tick),
    stepOnce: (count) => void api.stepOnce(count),
    setParams: (nextParams, opts2) => void api.setParams(nextParams, opts2)
  };
}

