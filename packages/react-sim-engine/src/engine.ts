import type {
  EngineConfig,
  EngineSnapshot,
  Tick,
  UpdateResult
} from './types';

function isFiniteTick(tick: unknown): tick is number {
  return typeof tick === 'number' && Number.isFinite(tick);
}

export function createSimulationEngine<
  Data,
  Params extends object,
  EngineResult = unknown
>(config: EngineConfig<Data, Params, EngineResult>) {
  const delayMs = config.delayMs ?? 0;
  const ticksPerAnimation = config.ticksPerAnimation ?? 1;
  const loop = config.loop ?? false;
  const noCache = config.noCache ?? false;

  const minTime: Tick = config.minTime ?? config.initialTick ?? 0;
  const maxTime: Tick | undefined = config.maxTime;

  let params: Params = { ...config.initialParams };
  let data: Data | undefined = config.initialData;
  let tick: Tick = minTime;
  let results: EngineResult[] = [];

  // In the original implementation, "canPlay" goes false when:
  // - the simulation hits maxTime, or
  // - the user calls `complete(...)`.
  let canPlay = true;
  let isPlaying = false;

  let lastUpdateMs: number | null = null;

  // Cache of computed ticks -> data.
  let cachedData: Record<Tick, Data> = {};

  let didInit = false;

  const listeners = new Set<(snapshot: EngineSnapshot<Data, Params, EngineResult>) => void>();

  const updateData = config.updateData;

  function snapshot(): EngineSnapshot<Data, Params, EngineResult> {
    if (data === undefined) {
      throw new Error('Simulation engine snapshot requested before data was initialized');
    }
    return {
      data,
      params,
      tick,
      results: [...results],
      isPlaying,
      canPlay
    };
  }

  function emit() {
    const snap = snapshot();
    listeners.forEach((l) => l(snap));
    config.onSnapshot?.(snap);
  }

  function init({ clearResults }: { clearResults: boolean }) {
    params = { ...params };
    tick = minTime;
    data = config.initialData ?? config.initData(params, config.context);

    if (!noCache) {
      cachedData = { [tick]: data };
    } else {
      cachedData = {};
    }

    canPlay = true;
    lastUpdateMs = null;
    if (clearResults) results = [];
  }

  function checkCanPlay(tickBeforeUpdate: Tick): boolean {
    if (!canPlay) return false;
    if (maxTime !== undefined && tickBeforeUpdate >= maxTime) {
      canPlay = false;
      isPlaying = false;
      return false;
    }
    return true;
  }

  function maybeLoop() {
    if (!loop) return;
    if (canPlay) return;

    // Mirror the original React `Model`: whenever `canPlay` drops to false,
    // we re-init and immediately set `isPlaying` back to true.
    init({ clearResults: false });
    isPlaying = true;
    emit();
  }

  function restartFromStop() {
    // Mirror original `stop()`:
    // - cancel animation (handled externally)
    // - isPlaying -> false
    // - tick -> minTime
    // - re-run initData
    isPlaying = false;
    init({ clearResults: false });
    emit();
  }

  function applyUpdateResult(res: UpdateResult<Data, EngineResult>): {
    continueLoop: boolean;
  } {
    data = res.data;

    switch (res.status) {
      case 'continue':
        return { continueLoop: true };
      case 'pause':
        isPlaying = false;
        return { continueLoop: false };
      case 'stop':
        restartFromStop();
        return { continueLoop: false };
      case 'complete':
        canPlay = false;
        isPlaying = false;
        results = [...results, ...(res.result === undefined ? ([] as EngineResult[]) : [res.result])];
        config.onComplete?.([...results]);
        return { continueLoop: false };
      default: {
        // Exhaustiveness fallback for TS
        isPlaying = false;
        return { continueLoop: false };
      }
    }
  }

  function advanceToTick(targetTick: Tick) {
    if (!didInit) return;
    if (targetTick <= tick) return;

    while (tick < targetTick && checkCanPlay(tick)) {
      // This mirrors the original: checkCanPlay(currentTick) before incrementing.
      const nextTick = tick + 1;
      tick = nextTick;

      const res = updateData({
        data: data as Data,
        params,
        tick,
        cachedData: noCache ? ({} as Record<Tick, Data>) : cachedData,
        context: config.context
      });

      // Update cached tick data.
      if (!noCache) {
        cachedData[tick] = res.data;
      }

      const { continueLoop } = applyUpdateResult(res);
      emit();

      if (!continueLoop) break;
    }

    maybeLoop();
  }

  function handleAnimationFrame(nowMs: number) {
    if (!didInit) return;
    if (!isPlaying) return;
    if (!checkCanPlay(tick)) return;

    if (lastUpdateMs === null) {
      lastUpdateMs = nowMs;
      return;
    }

    if (delayMs > 0 && nowMs - lastUpdateMs < delayMs) return;

    lastUpdateMs = nowMs;
    advanceToTick(tick + ticksPerAnimation);
  }

  const engine = {
    init() {
      init({ clearResults: true });
      didInit = true;
      emit();
    },

    getSnapshot() {
      if (!didInit) {
        throw new Error('Simulation engine not initialized. Call engine.init() first.');
      }
      return snapshot();
    },

    getCachedData() {
      // Expose cached tick data to adapters/frames.
      return noCache ? ({} as Record<Tick, Data>) : cachedData;
    },

    subscribe(listener: (snapshot: EngineSnapshot<Data, Params, EngineResult>) => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    play() {
      if (!didInit) this.init();
      if (!canPlay && loop) {
        init({ clearResults: false });
      }
      if (!canPlay) return;
      isPlaying = true;
      lastUpdateMs = null;
      emit();
    },

    pause() {
      if (!didInit) this.init();
      isPlaying = false;
      emit();
    },

    stop() {
      if (!didInit) this.init();
      restartFromStop();
    },

    seek(targetTick: Tick) {
      if (!isFiniteTick(targetTick)) {
        throw new Error(`seek(tick) expects a finite number; got: ${String(targetTick)}`);
      }
      if (!didInit) this.init();
      isPlaying = false;
      lastUpdateMs = null;
      advanceToTick(targetTick);
      emit();
    },

    /**
     * Advance the simulation by `count` ticks while paused (does not start playback).
     * Default `count` is 1 (one discrete step), regardless of `ticksPerAnimation`.
     */
    stepOnce(count: number = 1) {
      if (!didInit) this.init();
      if (!isFiniteTick(count) || count < 1) {
        throw new Error(`stepOnce(count) expects a positive finite number; got: ${String(count)}`);
      }
      isPlaying = false;
      lastUpdateMs = null;
      advanceToTick(tick + count);
      emit();
    },

    setParams(nextParams: Partial<Params>, opts?: { reset?: boolean }) {
      if (!didInit) this.init();
      params = { ...params, ...nextParams };

      if (opts?.reset) {
        init({ clearResults: false });
        if (isPlaying && canPlay) {
          lastUpdateMs = null;
        }
      } else {
        emit();
      }
    },

    handleAnimationFrame
  };

  // Initialize eagerly so adapters can read initial snapshot.
  engine.init();
  return engine;
}

