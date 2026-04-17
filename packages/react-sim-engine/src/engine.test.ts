import { describe, expect, it, vi } from 'vitest';
import { createEngine } from './engine';
import { defineSim } from './sim';

// ---------------------------------------------------------------------------
// Helpers — reusable sim configs for tests
// ---------------------------------------------------------------------------

/** Trivial counter sim: data is a number, incremented by params.increment each tick. */
function counterConfig(overrides?: {
  shouldStop?: (data: number, params: { increment: number }) => boolean;
  maxTime?: number;
  delayMs?: number;
  ticksPerFrame?: number;
}) {
  return {
    init: (params: { increment: number }) => 0,
    step: ({ data, params }: { data: number; params: { increment: number }; tick: number }) =>
      data + params.increment,
    initialParams: { increment: 1 },
    ...overrides,
  };
}

/** Sim that tracks how many times step was called and with what args. */
function spyConfig() {
  const stepCalls: Array<{ data: number; params: { x: number }; tick: number }> = [];
  return {
    config: {
      init: (params: { x: number }) => 0,
      step: (args: { data: number; params: { x: number }; tick: number }) => {
        stepCalls.push({ ...args });
        return args.data + args.params.x;
      },
      initialParams: { x: 10 },
    },
    stepCalls,
  };
}

// ===========================================================================
// Category 1: Initialization
// ===========================================================================

describe('initialization', () => {
  it('snapshot is available immediately after createEngine', () => {
    const engine = createEngine(counterConfig());
    const snap = engine.getSnapshot();
    expect(snap).toBeDefined();
    expect(snap.data).toBe(0);
    expect(snap.tick).toBe(0);
    expect(snap.status).toBe('idle');
  });

  it('init receives exactly the initialParams', () => {
    const initSpy = vi.fn((params: { start: number }) => params.start * 2);
    const engine = createEngine({
      init: initSpy,
      step: ({ data }) => data,
      initialParams: { start: 5 },
    });
    expect(initSpy).toHaveBeenCalledOnce();
    expect(initSpy).toHaveBeenCalledWith({ start: 5 });
    expect(engine.getSnapshot().data).toBe(10);
  });

  it('initial params are available in snapshot', () => {
    const engine = createEngine(counterConfig());
    expect(engine.getSnapshot().params).toEqual({ increment: 1 });
  });
});

// ===========================================================================
// Category 2: State Machine Transitions
// ===========================================================================

describe('state machine: from idle', () => {
  it('play() transitions to playing', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    expect(engine.getStatus()).toBe('playing');
  });

  it('pause() is a no-op', () => {
    const engine = createEngine(counterConfig());
    engine.pause();
    expect(engine.getStatus()).toBe('idle');
  });

  it('stop() is a no-op', () => {
    const engine = createEngine(counterConfig());
    engine.stop();
    expect(engine.getStatus()).toBe('idle');
  });

  it('seek(n) transitions to paused at tick n', () => {
    const engine = createEngine(counterConfig());
    engine.seek(5);
    expect(engine.getStatus()).toBe('paused');
    expect(engine.getSnapshot().tick).toBe(5);
  });

  it('advance(n) transitions to paused', () => {
    const engine = createEngine(counterConfig());
    engine.advance(3);
    expect(engine.getStatus()).toBe('paused');
    expect(engine.getSnapshot().tick).toBe(3);
  });
});

describe('state machine: from playing', () => {
  it('pause() transitions to paused, preserves tick', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    // Manually advance a few ticks so we're not at tick 0
    engine.advance(3);
    // advance puts us in paused; go back to playing
    engine.play();
    expect(engine.getStatus()).toBe('playing');
    engine.pause();
    expect(engine.getStatus()).toBe('paused');
    expect(engine.getSnapshot().tick).toBe(3);
  });

  it('stop() transitions to stopped', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.stop();
    expect(engine.getStatus()).toBe('stopped');
  });

  it('seek(n) transitions to paused', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.seek(5);
    expect(engine.getStatus()).toBe('paused');
    expect(engine.getSnapshot().tick).toBe(5);
  });

  it('play() when already playing is a no-op', () => {
    const engine = createEngine(counterConfig());
    const listener = vi.fn();
    engine.play();
    engine.subscribe(listener);
    const callsBefore = listener.mock.calls.length;
    engine.play();
    // Should not emit an extra snapshot
    expect(listener.mock.calls.length).toBe(callsBefore);
  });
});

describe('state machine: from paused', () => {
  function pausedEngine() {
    const engine = createEngine(counterConfig());
    engine.advance(2); // idle -> paused at tick 2
    expect(engine.getStatus()).toBe('paused');
    return engine;
  }

  it('play() transitions to playing', () => {
    const engine = pausedEngine();
    engine.play();
    expect(engine.getStatus()).toBe('playing');
  });

  it('stop() transitions to stopped', () => {
    const engine = pausedEngine();
    engine.stop();
    expect(engine.getStatus()).toBe('stopped');
  });

  it('seek(n) stays paused at new tick', () => {
    const engine = pausedEngine();
    engine.seek(7);
    expect(engine.getStatus()).toBe('paused');
    expect(engine.getSnapshot().tick).toBe(7);
  });

  it('advance(n) stays paused, tick increases', () => {
    const engine = pausedEngine();
    engine.advance(3);
    expect(engine.getStatus()).toBe('paused');
    expect(engine.getSnapshot().tick).toBe(5); // was at 2, advanced 3
  });
});

describe('state machine: from stopped', () => {
  function stoppedEngine() {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.stop();
    expect(engine.getStatus()).toBe('stopped');
    return engine;
  }

  it('play() is a no-op (stays stopped)', () => {
    const engine = stoppedEngine();
    engine.play();
    expect(engine.getStatus()).toBe('stopped');
  });

  it('pause() is a no-op', () => {
    const engine = stoppedEngine();
    engine.pause();
    expect(engine.getStatus()).toBe('stopped');
  });

  it('seek(n) is a no-op', () => {
    const engine = stoppedEngine();
    const tickBefore = engine.getSnapshot().tick;
    engine.seek(10);
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().tick).toBe(tickBefore);
  });

  it('advance(n) is a no-op', () => {
    const engine = stoppedEngine();
    const tickBefore = engine.getSnapshot().tick;
    engine.advance(5);
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().tick).toBe(tickBefore);
  });

  it('resetWith() transitions to idle at tick 0 with re-init', () => {
    const engine = stoppedEngine();
    engine.resetWith();
    expect(engine.getStatus()).toBe('idle');
    expect(engine.getSnapshot().tick).toBe(0);
  });

  it('resetWith() is the only way out of stopped', () => {
    const engine = stoppedEngine();
    engine.play();
    engine.pause();
    engine.seek(5);
    // Still stopped after all of those
    expect(engine.getStatus()).toBe('stopped');
    // Now resetWith
    engine.resetWith();
    expect(engine.getStatus()).toBe('idle');
  });
});

// ===========================================================================
// Category 3: Step Correctness
// ===========================================================================

describe('step correctness', () => {
  it('step receives correct data, params, tick on each call', () => {
    const { config, stepCalls } = spyConfig();
    const engine = createEngine(config);
    engine.advance(3);

    expect(stepCalls).toHaveLength(3);
    expect(stepCalls[0]).toEqual({ data: 0, params: { x: 10 }, tick: 1 });
    expect(stepCalls[1]).toEqual({ data: 10, params: { x: 10 }, tick: 2 });
    expect(stepCalls[2]).toEqual({ data: 20, params: { x: 10 }, tick: 3 });
  });

  it('step return value becomes the new data', () => {
    const engine = createEngine(counterConfig());
    engine.advance(3);
    // 0 + 1 + 1 + 1 = 3
    expect(engine.getSnapshot().data).toBe(3);
  });

  it('tick increments by 1 per step', () => {
    const engine = createEngine(counterConfig());
    engine.advance(1);
    expect(engine.getSnapshot().tick).toBe(1);
    engine.advance(1);
    expect(engine.getSnapshot().tick).toBe(2);
  });

  it('advance() defaults to 1 tick', () => {
    const engine = createEngine(counterConfig());
    engine.advance();
    expect(engine.getSnapshot().tick).toBe(1);
  });

  it('advance(5) runs step exactly 5 times', () => {
    const { config, stepCalls } = spyConfig();
    const engine = createEngine(config);
    engine.advance(5);
    expect(stepCalls).toHaveLength(5);
    expect(engine.getSnapshot().tick).toBe(5);
  });

  it('successive steps chain data correctly', () => {
    // Each step doubles the data
    const engine = createEngine({
      init: () => 1,
      step: ({ data }) => data * 2,
      initialParams: {},
    });
    engine.advance(4);
    // 1 -> 2 -> 4 -> 8 -> 16
    expect(engine.getSnapshot().data).toBe(16);
    expect(engine.getSnapshot().tick).toBe(4);
  });
});

// ===========================================================================
// Category 4: Termination
// ===========================================================================

describe('shouldStop', () => {
  it('is called after each step with (data, params)', () => {
    const shouldStopSpy = vi.fn(() => false);
    const engine = createEngine(counterConfig({ shouldStop: shouldStopSpy }));
    engine.advance(3);
    expect(shouldStopSpy).toHaveBeenCalledTimes(3);
    // After tick 1: data=1, after tick 2: data=2, after tick 3: data=3
    expect(shouldStopSpy).toHaveBeenNthCalledWith(1, 1, { increment: 1 });
    expect(shouldStopSpy).toHaveBeenNthCalledWith(2, 2, { increment: 1 });
    expect(shouldStopSpy).toHaveBeenNthCalledWith(3, 3, { increment: 1 });
  });

  it('stops at the tick where shouldStop returns true', () => {
    const engine = createEngine(
      counterConfig({
        shouldStop: (data) => data >= 3,
      })
    );
    engine.advance(10);
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().tick).toBe(3);
    expect(engine.getSnapshot().data).toBe(3);
  });

  it('shouldStop during seek stops before target tick', () => {
    const engine = createEngine(
      counterConfig({
        shouldStop: (data) => data >= 2,
      })
    );
    engine.seek(100);
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().tick).toBe(2);
  });

  it('without shouldStop, simulation runs indefinitely via advance', () => {
    const engine = createEngine(counterConfig());
    engine.advance(1000);
    expect(engine.getSnapshot().tick).toBe(1000);
    expect(engine.getStatus()).toBe('paused');
  });
});

describe('maxTime', () => {
  it('stops when tick reaches maxTime', () => {
    const engine = createEngine(counterConfig({ maxTime: 5 }));
    engine.advance(10);
    expect(engine.getSnapshot().tick).toBe(5);
    expect(engine.getStatus()).toBe('stopped');
  });

  it('without maxTime, no automatic termination', () => {
    const engine = createEngine(counterConfig());
    engine.advance(100);
    expect(engine.getSnapshot().tick).toBe(100);
    expect(engine.getStatus()).toBe('paused');
  });

  it('shouldStop and maxTime together: whichever triggers first wins', () => {
    // shouldStop at data >= 3 (tick 3), maxTime at 10
    const engine = createEngine(
      counterConfig({
        shouldStop: (data) => data >= 3,
        maxTime: 10,
      })
    );
    engine.advance(20);
    expect(engine.getSnapshot().tick).toBe(3); // shouldStop fired first

    // Now the reverse: maxTime at 2, shouldStop at data >= 10
    const engine2 = createEngine(
      counterConfig({
        shouldStop: (data) => data >= 10,
        maxTime: 2,
      })
    );
    engine2.advance(20);
    expect(engine2.getSnapshot().tick).toBe(2); // maxTime fired first
  });
});

// ===========================================================================
// Category 5: setParams vs resetWith
// ===========================================================================

describe('setParams', () => {
  it('merges patch with current params', () => {
    const engine = createEngine({
      init: (params: { a: number; b: string }) => params,
      step: ({ data }) => data,
      initialParams: { a: 1, b: 'hello' },
    });
    engine.setParams({ a: 99 });
    expect(engine.getSnapshot().params).toEqual({ a: 99, b: 'hello' });
  });

  it('does not call init', () => {
    const initSpy = vi.fn(() => 0);
    const engine = createEngine({
      init: initSpy,
      step: ({ data }) => data,
      initialParams: { x: 1 },
    });
    initSpy.mockClear(); // clear the init call from createEngine
    engine.setParams({ x: 2 });
    expect(initSpy).not.toHaveBeenCalled();
  });

  it('does not change status', () => {
    const engine = createEngine(counterConfig());
    // From idle
    engine.setParams({ increment: 5 });
    expect(engine.getStatus()).toBe('idle');

    // From paused
    engine.advance(1);
    engine.setParams({ increment: 10 });
    expect(engine.getStatus()).toBe('paused');

    // From playing
    engine.play();
    engine.setParams({ increment: 20 });
    expect(engine.getStatus()).toBe('playing');
  });

  it('next step sees updated params', () => {
    const engine = createEngine(counterConfig());
    engine.setParams({ increment: 100 });
    engine.advance(1);
    expect(engine.getSnapshot().data).toBe(100); // 0 + 100
  });
});

describe('resetWith', () => {
  it('merges patch with current params and calls init', () => {
    const initSpy = vi.fn((params: { a: number; b: number }) => params.a + params.b);
    const engine = createEngine({
      init: initSpy,
      step: ({ data }) => data,
      initialParams: { a: 1, b: 2 },
    });
    engine.setParams({ a: 10 }); // now params = { a: 10, b: 2 }
    initSpy.mockClear();
    engine.resetWith({ b: 20 }); // merges with current: { a: 10, b: 20 }
    expect(initSpy).toHaveBeenCalledWith({ a: 10, b: 20 });
    expect(engine.getSnapshot().data).toBe(30);
  });

  it('with no argument, uses current params', () => {
    const initSpy = vi.fn((params: { x: number }) => params.x);
    const engine = createEngine({
      init: initSpy,
      step: ({ data }) => data,
      initialParams: { x: 5 },
    });
    engine.setParams({ x: 99 });
    initSpy.mockClear();
    engine.resetWith();
    expect(initSpy).toHaveBeenCalledWith({ x: 99 });
  });

  it('resets tick to 0', () => {
    const engine = createEngine(counterConfig());
    engine.advance(10);
    expect(engine.getSnapshot().tick).toBe(10);
    engine.resetWith();
    expect(engine.getSnapshot().tick).toBe(0);
  });

  it('transitions to idle from any status', () => {
    // From paused
    const engine1 = createEngine(counterConfig());
    engine1.advance(1);
    expect(engine1.getStatus()).toBe('paused');
    engine1.resetWith();
    expect(engine1.getStatus()).toBe('idle');

    // From playing
    const engine2 = createEngine(counterConfig());
    engine2.play();
    expect(engine2.getStatus()).toBe('playing');
    engine2.resetWith();
    expect(engine2.getStatus()).toBe('idle');

    // From stopped
    const engine3 = createEngine(counterConfig());
    engine3.play();
    engine3.stop();
    expect(engine3.getStatus()).toBe('stopped');
    engine3.resetWith();
    expect(engine3.getStatus()).toBe('idle');

    // From idle (already idle, stays idle)
    const engine4 = createEngine(counterConfig());
    engine4.resetWith();
    expect(engine4.getStatus()).toBe('idle');
  });

  it('during playing, transitions to idle not back to playing', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.resetWith();
    expect(engine.getStatus()).toBe('idle');
  });
});

// ===========================================================================
// Category 6: Seek Behavior
// ===========================================================================

describe('seek', () => {
  it('advances to target tick by running step repeatedly', () => {
    const { config, stepCalls } = spyConfig();
    const engine = createEngine(config);
    engine.seek(3);
    expect(stepCalls).toHaveLength(3);
    expect(engine.getSnapshot().tick).toBe(3);
  });

  it('backward seek (target <= current tick) is a no-op', () => {
    const engine = createEngine(counterConfig());
    engine.advance(5);
    const snapBefore = engine.getSnapshot();
    engine.seek(3); // backward
    const snapAfter = engine.getSnapshot();
    expect(snapAfter.tick).toBe(snapBefore.tick);
    expect(snapAfter.data).toBe(snapBefore.data);
  });

  it('seek to current tick is a no-op for data', () => {
    const engine = createEngine(counterConfig());
    engine.advance(5);
    const snapBefore = engine.getSnapshot();
    engine.seek(5);
    expect(engine.getSnapshot().data).toBe(snapBefore.data);
    expect(engine.getSnapshot().tick).toBe(5);
  });

  it('seek always transitions to paused', () => {
    // From idle
    const engine1 = createEngine(counterConfig());
    engine1.seek(3);
    expect(engine1.getStatus()).toBe('paused');

    // From playing
    const engine2 = createEngine(counterConfig());
    engine2.play();
    engine2.seek(3);
    expect(engine2.getStatus()).toBe('paused');

    // From paused
    engine2.seek(6);
    expect(engine2.getStatus()).toBe('paused');
  });

  it('seek interrupted by shouldStop', () => {
    const engine = createEngine(
      counterConfig({ shouldStop: (data) => data >= 3 })
    );
    engine.seek(100);
    expect(engine.getSnapshot().tick).toBe(3);
    expect(engine.getStatus()).toBe('stopped');
  });

  it('seek interrupted by maxTime', () => {
    const engine = createEngine(counterConfig({ maxTime: 4 }));
    engine.seek(100);
    expect(engine.getSnapshot().tick).toBe(4);
    expect(engine.getStatus()).toBe('stopped');
  });
});

// ===========================================================================
// Category 7: Subscribe / Emit
// ===========================================================================

describe('subscribe', () => {
  it('listener receives snapshot after state-changing actions', () => {
    const engine = createEngine(counterConfig());
    const listener = vi.fn();
    engine.subscribe(listener);

    engine.advance(1);
    expect(listener).toHaveBeenCalled();
    const snap = listener.mock.calls[listener.mock.calls.length - 1][0];
    expect(snap.tick).toBe(1);
    expect(snap.status).toBe('paused');
  });

  it('unsubscribe stops delivery', () => {
    const engine = createEngine(counterConfig());
    const listener = vi.fn();
    const unsub = engine.subscribe(listener);

    engine.advance(1);
    const callsAfterFirst = listener.mock.calls.length;
    unsub();
    engine.advance(1);
    expect(listener.mock.calls.length).toBe(callsAfterFirst);
  });

  it('multiple listeners all receive updates', () => {
    const engine = createEngine(counterConfig());
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    engine.subscribe(listener1);
    engine.subscribe(listener2);

    engine.advance(1);
    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
  });

  it('snapshot from listener matches getSnapshot()', () => {
    const engine = createEngine(counterConfig());
    let listenerSnap: ReturnType<typeof engine.getSnapshot> | null = null;
    engine.subscribe((snap) => {
      listenerSnap = snap;
    });

    engine.advance(1);
    expect(listenerSnap).toEqual(engine.getSnapshot());
  });
});

// ===========================================================================
// Category 8: subscribeHistory
// ===========================================================================

describe('subscribeHistory', () => {
  it('listener receives { tick, data } after each step', () => {
    const engine = createEngine(counterConfig());
    const entries: Array<{ tick: number; data: number }> = [];
    engine.subscribeHistory((entry) => entries.push(entry));

    engine.advance(3);
    expect(entries).toHaveLength(3);
    expect(entries[0]).toEqual({ tick: 1, data: 1 });
    expect(entries[1]).toEqual({ tick: 2, data: 2 });
    expect(entries[2]).toEqual({ tick: 3, data: 3 });
  });

  it('no history entries when no subscribers', () => {
    const engine = createEngine(counterConfig());
    // No subscriber — just verify step still works
    engine.advance(5);
    expect(engine.getSnapshot().tick).toBe(5);

    // Now subscribe and advance more
    const entries: Array<{ tick: number; data: number }> = [];
    engine.subscribeHistory((entry) => entries.push(entry));
    engine.advance(2);
    // Should only have entries for tick 6 and 7, not 1-5
    expect(entries).toHaveLength(2);
    expect(entries[0].tick).toBe(6);
  });

  it('unsubscribe stops delivery', () => {
    const engine = createEngine(counterConfig());
    const entries: Array<{ tick: number; data: number }> = [];
    const unsub = engine.subscribeHistory((entry) => entries.push(entry));

    engine.advance(2);
    expect(entries).toHaveLength(2);
    unsub();
    engine.advance(2);
    expect(entries).toHaveLength(2); // no new entries
  });
});

// ===========================================================================
// Category 9: handleAnimationFrame (timing)
// ===========================================================================

describe('handleAnimationFrame', () => {
  it('does nothing when status is not playing', () => {
    const engine = createEngine(counterConfig());
    engine.handleAnimationFrame(0);
    engine.handleAnimationFrame(100);
    expect(engine.getSnapshot().tick).toBe(0);
    expect(engine.getStatus()).toBe('idle');
  });

  it('first frame is a no-op (establishes baseline)', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.handleAnimationFrame(0);
    expect(engine.getSnapshot().tick).toBe(0);
  });

  it('second frame advances ticks', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.handleAnimationFrame(0);
    engine.handleAnimationFrame(16);
    expect(engine.getSnapshot().tick).toBe(1);
  });

  it('respects delayMs', () => {
    const engine = createEngine(counterConfig({ delayMs: 100 }));
    engine.play();
    engine.handleAnimationFrame(0); // baseline
    engine.handleAnimationFrame(50); // too soon
    expect(engine.getSnapshot().tick).toBe(0);
    engine.handleAnimationFrame(100); // just right
    expect(engine.getSnapshot().tick).toBe(1);
  });

  it('advances ticksPerFrame ticks per frame', () => {
    const engine = createEngine(counterConfig({ ticksPerFrame: 5 }));
    engine.play();
    engine.handleAnimationFrame(0);
    engine.handleAnimationFrame(16);
    expect(engine.getSnapshot().tick).toBe(5);
  });

  it('after pause + resume, timing resets (no catch-up burst)', () => {
    const engine = createEngine(counterConfig({ delayMs: 100 }));
    engine.play();
    engine.handleAnimationFrame(0);
    engine.handleAnimationFrame(100);
    expect(engine.getSnapshot().tick).toBe(1);

    engine.pause();
    engine.play();
    // After resume, first frame should be baseline again
    engine.handleAnimationFrame(5000); // big time jump
    expect(engine.getSnapshot().tick).toBe(1); // no catch-up
    engine.handleAnimationFrame(5100);
    expect(engine.getSnapshot().tick).toBe(2); // normal advance
  });

  it('shouldStop fires during animation frame', () => {
    const engine = createEngine(
      counterConfig({
        shouldStop: (data) => data >= 3,
        ticksPerFrame: 10,
      })
    );
    engine.play();
    engine.handleAnimationFrame(0);
    engine.handleAnimationFrame(16);
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().tick).toBe(3);
  });

  it('maxTime fires during animation frame', () => {
    const engine = createEngine(counterConfig({ maxTime: 2, ticksPerFrame: 10 }));
    engine.play();
    engine.handleAnimationFrame(0);
    engine.handleAnimationFrame(16);
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().tick).toBe(2);
  });
});

// ===========================================================================
// Category 10: Edge cases
// ===========================================================================

describe('edge cases', () => {
  it('destroy clears all listeners', () => {
    const engine = createEngine(counterConfig());
    const listener = vi.fn();
    engine.subscribe(listener);
    engine.destroy();
    engine.advance(1);
    expect(listener).not.toHaveBeenCalled();
  });

  it('setParams from stopped does not change status', () => {
    const engine = createEngine(counterConfig());
    engine.play();
    engine.stop();
    engine.setParams({ increment: 99 });
    expect(engine.getStatus()).toBe('stopped');
    expect(engine.getSnapshot().params).toEqual({ increment: 99 });
  });

  it('resetWith after setParams uses merged params', () => {
    const engine = createEngine({
      init: (params: { a: number; b: number }) => ({ sum: params.a + params.b }),
      step: ({ data }) => data,
      initialParams: { a: 1, b: 2 },
    });
    engine.setParams({ a: 100 });
    engine.resetWith({ b: 200 });
    // Current was { a: 100, b: 2 }, patch is { b: 200 }, merged = { a: 100, b: 200 }
    expect(engine.getSnapshot().params).toEqual({ a: 100, b: 200 });
    expect(engine.getSnapshot().data).toEqual({ sum: 300 });
  });
});

// ===========================================================================
// defineSim integration
// ===========================================================================

describe('defineSim', () => {
  it('returns an object with init, step, defaultParams', () => {
    const sim = defineSim<{ n: number }, { start: number }>({
      defaultParams: { start: 0 },
      init: (params) => ({ n: params.start }),
      step: ({ data }) => ({ n: data.n + 1 }),
    });
    expect(sim.init).toBeTypeOf('function');
    expect(sim.step).toBeTypeOf('function');
    expect(sim.defaultParams).toEqual({ start: 0 });
  });

  it('shouldStop is optional', () => {
    const sim = defineSim<number, {}>({
      defaultParams: {},
      init: () => 0,
      step: ({ data }) => data + 1,
    });
    expect(sim.shouldStop).toBeUndefined();
  });

  it('works with createEngine using defaultParams as initialParams', () => {
    const sim = defineSim<{ count: number }, { increment: number }>({
      defaultParams: { increment: 5 },
      init: () => ({ count: 0 }),
      step: ({ data, params }) => ({ count: data.count + params.increment }),
    });

    const engine = createEngine({
      ...sim,
      initialParams: sim.defaultParams,
    });
    engine.advance(3);
    expect(engine.getSnapshot().data).toEqual({ count: 15 });
  });
});
