import { describe, expect, it, vi } from 'vitest';
import { createSimulationEngine } from './engine';
import type { EngineConfig } from './types';

describe('react-sim-engine core', () => {
  it('runs initData and advances tick via seek()', () => {
    const initData = (params: { start: number }) => ({ value: params.start });
    const updateData: EngineConfig<{ value: number }, { start: number }, number>['updateData'] =
      ({ data, tick }) => ({ status: 'continue', data: { value: data.value + tick } });

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: { start: 1 },
      minTime: 0,
      maxTime: 10,
      delayMs: 0,
      ticksPerAnimation: 1
    });

    const snap0 = engine.getSnapshot();
    expect(snap0.tick).toBe(0);
    expect(snap0.data.value).toBe(1);

    engine.seek(3);
    const snap3 = engine.getSnapshot();
    expect(snap3.tick).toBe(3);
    // init value + (tick1 + tick2 + tick3)
    expect(snap3.data.value).toBe(1 + 1 + 2 + 3);
    expect(snap3.isPlaying).toBe(false);
  });

  it('respects maxTime by stopping further progress', () => {
    const initData = () => 0;
    const updateData: EngineConfig<number, {}, unknown>['updateData'] = ({ data, tick }) => ({
      status: 'continue',
      data: data + tick
    });

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 2,
      delayMs: 0
    });

    engine.seek(5);
    const snap = engine.getSnapshot();
    // Should have computed tick 2 but not beyond (mirrors original checkCanPlay(tickBeforeUpdate)).
    expect(snap.tick).toBe(2);
    expect(snap.canPlay).toBe(false);
    expect(snap.isPlaying).toBe(false);
  });

  it('caches computed ticks and exposes them to updateData', () => {
    const initData = () => ({ v: 0 });
    const seenTicks: number[] = [];

    const updateData: EngineConfig<{ v: number }, {}, unknown>['updateData'] = ({
      tick,
      cachedData
    }) => {
      if (tick >= 1) {
        seenTicks.push(tick);
        // At tick 2 updateData call, tick 1 should already be cached.
        if (tick === 2) {
          expect(cachedData[1]?.v).toBe(0);
        }
      }
      return { status: 'continue', data: { v: tick - 1 } };
    };

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 4
    });

    engine.seek(3);
    expect(seenTicks).toEqual([1, 2, 3]);
    const snap3 = engine.getSnapshot();
    expect(snap3.tick).toBe(3);
  });

  it('pause status stops simulation progress but keeps canPlay=true', () => {
    const initData = () => 0;
    const updateData: EngineConfig<number, {}, unknown>['updateData'] = ({ data, tick }) => {
      if (tick === 2) {
        return { status: 'pause', data: data + tick };
      }
      return { status: 'continue', data: data + tick };
    };

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 10,
      delayMs: 0
    });

    engine.play();
    engine.seek(5); // seek pauses externally and advances deterministically
    const snap = engine.getSnapshot();
    // When tick==2 updateData pauses, engine stops at tick 2.
    expect(snap.tick).toBe(2);
    expect(snap.canPlay).toBe(true);
    expect(snap.isPlaying).toBe(false);
  });

  it('complete status sets canPlay=false and emits onComplete results', () => {
    const initData = () => 0;

    const onComplete = vi.fn();
    const updateData: EngineConfig<number, {}, number>['updateData'] = ({ data, tick }) => {
      if (tick === 2) {
        return { status: 'complete', data: data + tick, result: 123 };
      }
      return { status: 'continue', data: data + tick };
    };

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 10,
      delayMs: 0,
      onComplete
    });

    engine.seek(5);
    const snap = engine.getSnapshot();
    expect(snap.tick).toBe(2);
    expect(snap.canPlay).toBe(false);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith([123]);
  });

  it('stop status resets tick/data back to minTime', () => {
    const initData = () => ({ kind: 'init' as const });
    const updateData: EngineConfig<{ kind: string }, {}, unknown>['updateData'] = ({
      tick
    }) => {
      if (tick === 1) {
        return { status: 'stop', data: { kind: 'ignored' } };
      }
      return { status: 'continue', data: { kind: `tick-${tick}` } };
    };

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 10
    });

    engine.seek(3);
    const snap = engine.getSnapshot();
    // After stop, tick is reset to minTime.
    expect(snap.tick).toBe(0);
    expect(snap.data.kind).toBe('init');
  });

  it('delay semantics: advances only when nowMs-lastUpdateMs >= delayMs', () => {
    const initData = () => 0;
    const updateData: EngineConfig<number, {}, unknown>['updateData'] = ({ data }) => ({
      status: 'continue',
      data: data + 1
    });

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 100,
      delayMs: 100,
      ticksPerAnimation: 1
    });

    engine.play();

    engine.handleAnimationFrame(0); // sets lastUpdateMs
    expect(engine.getSnapshot().tick).toBe(0);

    engine.handleAnimationFrame(50); // too soon
    expect(engine.getSnapshot().tick).toBe(0);

    engine.handleAnimationFrame(100); // advance once
    expect(engine.getSnapshot().tick).toBe(1);
  });

  it('loop restarts when canPlay becomes false due to maxTime', () => {
    const updateData: EngineConfig<{ restarted: boolean }, {}, unknown>['updateData'] = ({ tick }) => ({
      status: 'continue',
      data: { restarted: tick === 0 }
    });

    const engine = createSimulationEngine({
      initData: () => ({ restarted: true }),
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 1,
      loop: true,
      delayMs: 0,
      ticksPerAnimation: 1
    });

    engine.play();
    // seek triggers advanceToTick and then maybeLoop() at the end.
    engine.seek(5);
    const snap = engine.getSnapshot();
    expect(snap.canPlay).toBe(true);
    expect(snap.isPlaying).toBe(true);
    expect(snap.tick).toBe(0);
  });

  it('stepOnce advances by one tick while paused', () => {
    const initData = () => 0;
    const updateData: EngineConfig<number, {}, unknown>['updateData'] = ({ data, tick }) => ({
      status: 'continue',
      data: data + tick
    });

    const engine = createSimulationEngine({
      initData,
      updateData,
      initialParams: {},
      minTime: 0,
      maxTime: 100,
      delayMs: 0
    });

    expect(engine.getSnapshot().tick).toBe(0);
    engine.pause();
    engine.stepOnce(1);
    expect(engine.getSnapshot().tick).toBe(1);
    engine.stepOnce(2);
    expect(engine.getSnapshot().tick).toBe(3);
  });
});

