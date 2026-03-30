# react-sim-engine

Pure TypeScript simulation engine extracted from the original React-only `Model`.

## Core concepts

- `initData(params) -> data`: creates the initial simulation dataset.
- `updateData({ data, params, tick, cachedData }) -> UpdateResult`: computes the next dataset when the engine advances `tick`.
- The engine runs a tick loop (play/pause) and calls `updateData` as needed.
- Frames/renderers live outside the engine (typically in the React adapter) and read `data/tick/params` snapshots.

## updateData contract

When the engine advances from `tick = N` to `tick = N+1`:

1. It calls `updateData` with:
   - `data`: current dataset at tick `N`
   - `params`: current simulation parameters
   - `tick`: the *target tick* after advancement (`N+1`)
   - `cachedData`: read-only map of already-computed ticks to datasets
2. `updateData` returns an `UpdateResult`:
   - `{ status: 'continue', data }`: keep going (engine may keep playing)
   - `{ status: 'pause', data }`: pause after applying `data` for that tick
   - `{ status: 'stop', data }`: reset the simulation (re-run `initData`) after applying `data`
   - `{ status: 'complete', data, result? }`: stop the simulation and optionally emit a completion `result`

## Commands

The engine exposes:

- `engine.play()`: start/continue running
- `engine.pause()`: pause after the current snapshot
- `engine.stop()`: reset tick to `minTime` (or `initialTick`) and re-run `initData`
- `engine.seek(tick)`: compute state at `tick` and pause
- `engine.stepOnce(count?)`: advance by `count` ticks (default `1`) while paused; does not start playback
- `engine.setParams(nextParams, { reset?: boolean })`: merge params; optionally re-run `initData`

## Timing semantics

The engine supports wall-clock timing via `engine.handleAnimationFrame(nowMs)`:

- if `delayMs` is unset or `0`, the engine advances immediately when playing
- otherwise, it advances only when `nowMs - lastUpdateMs >= delayMs`
- each advance advances `ticksPerAnimation` ticks (default: `1`)

React adapters (and worker hosts) typically call `handleAnimationFrame` inside a `requestAnimationFrame` loop or an interval.

