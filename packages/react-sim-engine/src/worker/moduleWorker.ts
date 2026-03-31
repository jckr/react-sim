import { expose } from 'comlink';
import { createSimulationEngine } from '../engine';
import type { EngineSnapshot } from '../types';
import type { SimulationModule, SimulationModuleRef } from '../runner/moduleTypes';

/** Type-only re-export so the worker module emits a non-empty declaration file. */
export type { SimulationModuleRef, SimulationModule } from '../runner/moduleTypes';

type AnyModule = SimulationModule<unknown, object, unknown>;
type AnySnapshot = EngineSnapshot<unknown, object, unknown>;

type CreateFromModuleConfig<Params extends object> = {
  module: SimulationModuleRef;
  initialParams: Params;
  initialTick?: number;
  minTime?: number;
  maxTime?: number;
  delayMs?: number;
  ticksPerAnimation?: number;
  loop?: boolean;
  noCache?: boolean;
  context?: unknown;
};

let engine: ReturnType<typeof createSimulationEngine<unknown, object, unknown>> | null = null;
let unsubscribe: (() => void) | null = null;
const snapshotListeners = new Map<number, (snapshot: AnySnapshot) => void>();
let nextListenerId = 1;
let intervalId: ReturnType<typeof setInterval> | null = null;

let drawFn: AnyModule['draw'] | undefined;
let drawCtx: OffscreenCanvasRenderingContext2D | null = null;

function ensureTickLoop() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    const e = engine;
    if (!e) return;
    e.handleAnimationFrame(Date.now());

    // Ensure worker-side rendering is driven even if snapshots aren't pushed for some reason.
    if (drawFn && drawCtx) {
      try {
        maybeDraw(e.getSnapshot() as AnySnapshot);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('moduleWorker draw failed', err);
      }
    }
  }, 16);
}

async function importSimulationModule(ref: SimulationModuleRef): Promise<AnyModule> {
  if (ref.kind === 'url') {
    const mod = (await import(/* @vite-ignore */ ref.url)) as unknown;
    if (isSimulationModule(mod)) return mod;
    if (isSimulationModule((mod as { module?: unknown }).module)) return (mod as { module: AnyModule }).module;
    throw new Error('Module URL did not export a SimulationModule');
  }
  const mod = (await import(ref.specifier)) as unknown;
  if (isSimulationModule(mod)) return mod;
  if (isSimulationModule((mod as { module?: unknown }).module)) return (mod as { module: AnyModule }).module;
  throw new Error('Module specifier did not export a SimulationModule');
}

function isSimulationModule(value: unknown): value is AnyModule {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<Record<string, unknown>>;
  return typeof v.initData === 'function' && typeof v.updateData === 'function';
}

function maybeDraw(snapshot: AnySnapshot) {
  if (!drawFn || !drawCtx) return;
  try {
    drawFn({ ctx: drawCtx, snapshot });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('moduleWorker draw failed', err);
  }
}

expose({
  async createFromModule<Params extends object>(config: CreateFromModuleConfig<Params>) {
    const mod = await importSimulationModule(config.module);
    drawFn = mod.draw;

    const created = createSimulationEngine<unknown, object, unknown>({
      initialParams: config.initialParams as object,
      initialTick: config.initialTick,
      minTime: config.minTime,
      maxTime: config.maxTime,
      delayMs: config.delayMs,
      ticksPerAnimation: config.ticksPerAnimation,
      loop: config.loop,
      noCache: config.noCache,
      context: config.context,
      initData: mod.initData as AnyModule['initData'],
      updateData: mod.updateData as AnyModule['updateData'],
      onSnapshot: (snap) => {
        maybeDraw(snap as AnySnapshot);
      }
    });

    engine = created;
    ensureTickLoop();

    unsubscribe?.();
    unsubscribe = created.subscribe((snap) => {
      maybeDraw(snap as AnySnapshot);
      snapshotListeners.forEach((l) => l(snap as AnySnapshot));
    });

    created.init();
    return true;
  },

  setOffscreenCanvas(canvas: OffscreenCanvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('OffscreenCanvas 2D context not available');
    drawCtx = ctx;
    if (engine) {
      maybeDraw(engine.getSnapshot() as AnySnapshot);
    }
  },

  subscribeSnapshot(cb: (snapshot: AnySnapshot) => void) {
    const id = nextListenerId++;
    snapshotListeners.set(id, cb);
    return id;
  },

  unsubscribeSnapshot(id: number) {
    snapshotListeners.delete(id);
  },

  async getSnapshot() {
    if (!engine) throw new Error('Engine not created');
    return engine.getSnapshot() as AnySnapshot;
  },

  async getCachedData() {
    if (!engine) throw new Error('Engine not created');
    return engine.getCachedData() as Record<number, unknown>;
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
  stepOnce(count?: number) {
    engine?.stepOnce(count);
  },
  setParams(nextParams: Record<string, unknown>, opts?: { reset?: boolean }) {
    engine?.setParams(nextParams as Partial<object>, opts);
  }
});
