import type { StepArgs } from './sim';

export type SimulationStatus = 'idle' | 'playing' | 'paused' | 'stopped';

export type EngineConfig<Data, Params> = {
  init: (params: Params) => Data;
  step: (args: StepArgs<Data, Params>) => Data;
  shouldStop?: (data: Data, params: Params) => boolean;
  initialParams: Params;
  maxTime?: number;
  delayMs?: number;
  ticksPerFrame?: number;
};

export type EngineSnapshot<Data, Params> = {
  data: Data;
  params: Params;
  tick: number;
  status: SimulationStatus;
};

export class SimulationEngine<Data, Params> {
  private data: Data;
  private params: Params;
  private tick: number = 0;
  private status: SimulationStatus = 'idle';
  private lastUpdateMs: number | null = null;

  private readonly initFn: (params: Params) => Data;
  private readonly stepFn: (args: StepArgs<Data, Params>) => Data;
  private readonly shouldStopFn?: (data: Data, params: Params) => boolean;
  private readonly maxTime?: number;
  private readonly delayMs: number;
  private readonly ticksPerFrame: number;

  private readonly listeners = new Set<
    (snapshot: EngineSnapshot<Data, Params>) => void
  >();
  private readonly historyListeners = new Set<
    (entry: { tick: number; data: Data }) => void
  >();

  constructor(config: EngineConfig<Data, Params>) {
    this.initFn = config.init;
    this.stepFn = config.step;
    this.shouldStopFn = config.shouldStop;
    this.maxTime = config.maxTime;
    this.delayMs = config.delayMs ?? 0;
    this.ticksPerFrame = config.ticksPerFrame ?? 1;

    this.params = { ...config.initialParams };
    this.data = this.initFn(this.params);
  }

  getSnapshot(): EngineSnapshot<Data, Params> {
    return {
      data: this.data,
      params: this.params,
      tick: this.tick,
      status: this.status,
    };
  }

  getStatus(): SimulationStatus {
    return this.status;
  }

  subscribe(
    listener: (snapshot: EngineSnapshot<Data, Params>) => void
  ): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  subscribeHistory(
    listener: (entry: { tick: number; data: Data }) => void
  ): () => void {
    this.historyListeners.add(listener);
    return () => {
      this.historyListeners.delete(listener);
    };
  }

  play(): void {
    if (this.status === 'stopped') return;
    if (this.status === 'playing') return;
    this.status = 'playing';
    this.lastUpdateMs = null;
    this.emit();
  }

  pause(): void {
    if (this.status !== 'playing') return;
    this.status = 'paused';
    this.emit();
  }

  stop(): void {
    if (this.status === 'idle' || this.status === 'stopped') return;
    this.status = 'stopped';
    this.emit();
  }

  seek(targetTick: number): void {
    if (this.status === 'stopped') return;
    if (targetTick <= this.tick) {
      // Backward seek is a no-op for data, but still transitions to paused
      if (this.status !== 'paused') {
        this.status = 'paused';
        this.emit();
      }
      return;
    }
    this.status = 'paused';
    this.lastUpdateMs = null;
    this.advanceTicks(targetTick - this.tick);
    if (this.status === 'paused') {
      this.emit();
    }
  }

  advance(count: number = 1): void {
    if (this.status === 'stopped') return;
    if (this.status === 'playing' || this.status === 'idle') {
      this.status = 'paused';
    }
    this.lastUpdateMs = null;
    this.advanceTicks(count);
    if (this.status === 'paused') {
      this.emit();
    }
  }

  setParams(patch: Partial<Params>): void {
    this.params = { ...this.params, ...patch };
    this.emit();
  }

  resetWith(patch?: Partial<Params>): void {
    if (patch) {
      this.params = { ...this.params, ...patch };
    }
    this.data = this.initFn(this.params);
    this.tick = 0;
    this.status = 'idle';
    this.lastUpdateMs = null;
    this.emit();
  }

  handleAnimationFrame(nowMs: number): void {
    if (this.status !== 'playing') return;

    if (this.lastUpdateMs === null) {
      this.lastUpdateMs = nowMs;
      return;
    }

    if (this.delayMs > 0 && nowMs - this.lastUpdateMs < this.delayMs) return;

    this.lastUpdateMs = nowMs;
    this.advanceTicks(this.ticksPerFrame);
    if (this.status === 'playing') {
      this.emit();
    }
  }

  destroy(): void {
    this.listeners.clear();
    this.historyListeners.clear();
  }

  /**
   * Run step up to `count` ticks. Returns true if all ticks completed
   * without termination, false if stopped early.
   */
  private advanceTicks(count: number): boolean {
    for (let i = 0; i < count; i++) {
      if (this.maxTime !== undefined && this.tick >= this.maxTime) {
        this.status = 'stopped';
        this.emit();
        return false;
      }

      this.tick += 1;
      this.data = this.stepFn({ data: this.data, params: this.params, tick: this.tick });
      this.emitHistory();

      if (this.shouldStopFn?.(this.data, this.params)) {
        this.status = 'stopped';
        this.emit();
        return false;
      }

      if (this.maxTime !== undefined && this.tick >= this.maxTime) {
        this.status = 'stopped';
        this.emit();
        return false;
      }
    }
    return true;
  }

  private emit(): void {
    const snap = this.getSnapshot();
    for (const l of this.listeners) {
      l(snap);
    }
  }

  private emitHistory(): void {
    if (this.historyListeners.size === 0) return;
    const entry = { tick: this.tick, data: this.data };
    for (const l of this.historyListeners) {
      l(entry);
    }
  }
}

export function createEngine<Data, Params>(
  config: EngineConfig<Data, Params>
): SimulationEngine<Data, Params> {
  return new SimulationEngine(config);
}
