---
name: three-modes-sim
overview: Add three execution modes (local, worker+main render, worker+offscreen deferred) with both imperative and React APIs, optimizing worker messaging via optional selectRenderState.
---

## Scope
- Implement **Mode 1** (local: init/update/render on main thread) and **Mode 2** (init/update on worker, render on main thread with optional reduced render-state).
- **Defer Mode 3** (worker + OffscreenCanvas rendering) for now.

## Target API (high level)
- **Simulation module contract** (business logic focused):
  - Required: `initData(params, context?)`, `updateData({ data, params, tick, cachedData, context })`
  - Optional: `selectRenderState({ data, params, tick, results }) => RenderState`
    - If absent, Mode 2 falls back to sending full `data`.

## Engine (imperative) surfaces
- **Mode 1**: keep/extend `createSimulationEngine` for local runs.
- **Mode 2**: add a new worker host/runner pair that:
  - runs `initData`/`updateData` in worker
  - on each snapshot, computes `renderState = selectRenderState(snapshot)` if provided
  - emits to the main thread only `{ tick, params, isPlaying, canPlay, results, renderState }` (plus optional full `data` fallback)

## React surfaces
- **Mode 1**: keep `<Simulation …>` and `useSimulationContext`.
- **Mode 2**: add a new React component, e.g. `<WorkerSimulationRenderState …>` that provides context containing:
  - actions (play/pause/stop/seek/stepOnce/setParams)
  - `tick/params/isPlaying/canPlay/results`
  - `renderState` (typed) and optionally `data` if no selector.

## Docs/examples
- Add or update docs examples to explicitly cover:
  - Mode 1 example drawing to a main-thread canvas.
  - Mode 2 example drawing to a main-thread canvas driven by `renderState` from the worker.

## Verification (decide before coding)
- **Unit tests (Vitest)**:
  - For Mode 2 worker host/runner: verify that when `selectRenderState` is present, the message payload does **not** include full `data` and that `renderState` updates over ticks.
  - Verify fallback behavior when `selectRenderState` is absent (full data sent).
- **E2E tests (Playwright)** for Mode 1 + Mode 2:
  - Load example pages, take a screenshot of the visible `<canvas>`, click `Step`, assert the screenshot digest changes.
  - (Since Mode 2 renders on main thread, pixel assertions are reliable.)

## Key files to add/change
- Engine types:
  - `packages/react-sim-engine/src/runner/moduleTypes.ts` (extend to include `selectRenderState?`)
  - new worker host for Mode 2, e.g. `packages/react-sim-engine/src/worker/renderStateWorker.ts` + host wrapper
- React:
  - new component in `packages/react-sim-react/src/` for Mode 2 worker + main render
- Docs:
  - example sim modules under `apps/react-sim-docs/src/sims/`
  - example pages under `apps/react-sim-docs/src/pages/examples/`
  - Playwright tests under `apps/react-sim-docs/e2e/`

