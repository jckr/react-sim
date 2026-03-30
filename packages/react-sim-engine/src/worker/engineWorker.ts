import { expose } from 'comlink';
import { createSimulationEngine } from '../engine';
import type { EngineConfig, EngineSnapshot, InitDataFn, UpdateDataFn } from '../types';
import type { WorkerEngineConfig } from './workerTypes';

/** Type-only re-export so the worker entry emits a non-empty declaration file. */
export type { WorkerEngineConfig } from './workerTypes';

function compileFunction<T extends (...args: never[]) => unknown>(source: string): T {
  const candidate = new Function(`return (${source})`)();
  if (typeof candidate !== 'function') {
    throw new Error('Worker config function source did not evaluate to a function');
  }
  return candidate as T;
}

type EngineInstance = ReturnType<typeof createSimulationEngine<unknown, object, unknown>>;

let engine: EngineInstance | null = null;
let unsubscribe: (() => void) | null = null;
let snapshotListener: ((snapshot: EngineSnapshot<unknown, object, unknown>) => void) | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
let setParamsFromWire: ((next: Record<string, unknown>, opts?: { reset?: boolean }) => void) | null = null;

function ensureTickLoop() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    engine?.handleAnimationFrame(Date.now());
  }, 16);
}

expose({
  async createEngine<Data, Params extends object, Result>(
    config: WorkerEngineConfig<Data, Params, Result>
  ) {
    const initData = compileFunction<InitDataFn<Params, Data, Result>>(config.initDataSource);
    const updateData = compileFunction<UpdateDataFn<Data, Params, Result>>(config.updateDataSource);

    const { initDataSource: _initSrc, updateDataSource: _updSrc, ...rest } = config;
    const engineConfig: EngineConfig<Data, Params, Result> = {
      ...rest,
      initData,
      updateData
    };

    const created = createSimulationEngine<Data, Params, Result>(engineConfig);
    engine = created;

    setParamsFromWire = (nextParams: Record<string, unknown>, opts?: { reset?: boolean }) => {
      created.setParams(nextParams as Partial<Params>, opts);
    };

    ensureTickLoop();

    unsubscribe?.();
    unsubscribe = created.subscribe((snap) => {
      snapshotListener?.(snap);
    });

    return true;
  },

  subscribeSnapshot(cb: (snapshot: EngineSnapshot<unknown, object, unknown>) => void) {
    snapshotListener = cb;
  },

  getSnapshot() {
    if (!engine) throw new Error('Engine not created');
    return engine.getSnapshot();
  },

  getCachedData() {
    if (!engine) throw new Error('Engine not created');
    return engine.getCachedData();
  },

  play() {
    engine?.play();
  },

  pause() {
    engine?.pause();
  },

  stop() {
    engine?.stop();
  },

  seek(tick: number) {
    engine?.seek(tick);
  },

  setParams(nextParams: Record<string, unknown>, opts?: { reset?: boolean }) {
    setParamsFromWire?.(nextParams, opts);
  }
});
