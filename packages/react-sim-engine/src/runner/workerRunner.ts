import type { Remote } from 'comlink';
import { proxy, transfer, wrap } from 'comlink';
import type { EngineConfig, EngineSnapshot, Tick } from '../types';
import type { SimulationModuleRef } from './moduleTypes';
import type { SimulationRunner } from './runnerTypes';

export type ModuleWorkerClient<Data, Params extends object, Result> = {
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
  setOffscreenCanvas: (canvas: OffscreenCanvas) => void;
  subscribeSnapshot: (cb: (snapshot: EngineSnapshot<Data, Params, Result>) => void) => number;
  unsubscribeSnapshot: (id: number) => void;
  getSnapshot: () => Promise<EngineSnapshot<Data, Params, Result>>;
  getCachedData: () => Promise<Record<number, Data>>;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: Tick) => void;
  stepOnce: (count?: number) => void;
  setParams: (nextParams: Record<string, unknown>, opts?: { reset?: boolean }) => void;
};

export type WorkerRunnerOptions<Data, Params extends object, Result> = {
  worker: Worker;
  module: SimulationModuleRef;
  config: Omit<EngineConfig<Data, Params, Result>, 'initData' | 'updateData'>;
  onSnapshot?: (snapshot: EngineSnapshot<Data, Params, Result>) => void;
};

const transferredCanvases = new WeakSet<HTMLCanvasElement>();

export function createDefaultModuleWorker(): Worker {
  const baseUrl = import.meta.url;
  if (!baseUrl) {
    throw new Error('createDefaultModuleWorker requires ESM (import.meta.url)');
  }
  const url = new URL('../worker/moduleWorker.js', baseUrl);
  return new Worker(url, { type: 'module' });
}

export async function createWorkerSimulationRunner<Data, Params extends object, Result = unknown>(
  opts: WorkerRunnerOptions<Data, Params, Result>
): Promise<SimulationRunner<Data, Params, Result> & { setCanvasFromElement: (el: HTMLCanvasElement) => void }> {
  const api = wrap<ModuleWorkerClient<Data, Params, Result>>(opts.worker) as Remote<ModuleWorkerClient<Data, Params, Result>>;

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
    init: () => {
      // already initialized in worker
    },
    dispose: () => {
      opts.worker.terminate();
    },
    getSnapshot: async () => await api.getSnapshot(),
    getCachedData: async () => await api.getCachedData(),
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
    setParams: (nextParams, opts2) => void api.setParams(nextParams as Record<string, unknown>, opts2),
    setCanvasFromElement: (el: HTMLCanvasElement) => {
      if (transferredCanvases.has(el)) return;
      if (typeof el.transferControlToOffscreen !== 'function') {
        throw new Error('transferControlToOffscreen is not supported in this environment');
      }
      const offscreen = el.transferControlToOffscreen();
      transferredCanvases.add(el);
      api.setOffscreenCanvas(transfer(offscreen, [offscreen]));
    }
  };
}

