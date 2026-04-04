import { expose } from 'comlink';
import { createSimulationEngine } from '../engine';
import type { EngineSnapshot, Tick } from '../types';
import type { SimulationModule, SimulationModuleRef } from '../runner/moduleTypes';

type AnyModule = SimulationModule<unknown, object, unknown, unknown>;
type AnySnapshot = EngineSnapshot<unknown, object, unknown>;

export type RenderStateEnvelope<RenderState> =
  | { kind: 'renderState'; renderState: RenderState }
  | { kind: 'data'; data: unknown };

export type RenderStateSnapshot<Params extends object, Result> = {
  tick: Tick;
  params: Params;
  isPlaying: boolean;
  canPlay: boolean;
  results: Result[];
  envelope: RenderStateEnvelope<unknown>;
};

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
const snapshotListeners = new Map<number, (snapshot: RenderStateSnapshot<object, unknown>) => void>();
let nextListenerId = 1;
let intervalId: ReturnType<typeof setInterval> | null = null;

let selectRenderStateFn: AnyModule['selectRenderState'] | undefined;

function ensureTickLoop() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    engine?.handleAnimationFrame(Date.now());
  }, 16);
}

function isSimulationModule(value: unknown): value is AnyModule {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<Record<string, unknown>>;
  return typeof v.initData === 'function' && typeof v.updateData === 'function';
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

function toRenderStateSnapshot(snap: AnySnapshot): RenderStateSnapshot<object, unknown> {
  const envelope: RenderStateEnvelope<unknown> =
    typeof selectRenderStateFn === 'function'
      ? { kind: 'renderState', renderState: selectRenderStateFn(snap as never) }
      : { kind: 'data', data: snap.data };

  return {
    tick: snap.tick,
    params: snap.params,
    isPlaying: snap.isPlaying,
    canPlay: snap.canPlay,
    results: snap.results,
    envelope
  };
}

expose({
  async createFromModule<Params extends object>(config: CreateFromModuleConfig<Params>) {
    const mod = await importSimulationModule(config.module);
    selectRenderStateFn = mod.selectRenderState as AnyModule['selectRenderState'];

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
      updateData: mod.updateData as AnyModule['updateData']
    });

    engine = created;
    ensureTickLoop();

    unsubscribe?.();
    unsubscribe = created.subscribe((snap) => {
      const rs = toRenderStateSnapshot(snap as AnySnapshot);
      snapshotListeners.forEach((l) => l(rs));
    });

    created.init();
    return true;
  },

  subscribeSnapshot(cb: (snapshot: RenderStateSnapshot<object, unknown>) => void) {
    const id = nextListenerId++;
    snapshotListeners.set(id, cb);
    return id;
  },

  unsubscribeSnapshot(id: number) {
    snapshotListeners.delete(id);
  },

  async getSnapshot() {
    if (!engine) throw new Error('Engine not created');
    return toRenderStateSnapshot(engine.getSnapshot() as AnySnapshot);
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

