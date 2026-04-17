# Plan: react-sim Library Rewrite (Part 1 of Project 4)

## Context

react-sim is an existing TypeScript/web-workers rewrite of a React simulation library. The `react-sim-20` branch has a working but flawed implementation: the main-thread and worker-sim paths work, but the API carries unnecessary complexity (envelope unions, Result generics, opaque context fields, object-bound generics, cast ladders), the types leak `unknown` throughout, and the three-component shape (`Simulation` / `WorkerSimulation` / `WorkerRenderSimulation`) mixes concerns.

This plan is a full rewrite of the library surface and implementation. The goal is a clean, typed, single-component API that makes tick-based simulations easy in the simple case and workers-without-tears in the expensive case.

The 3D snake demo (originally Task 3 of `plan-4-react-sim.md`) is **out of scope** for this plan. It becomes the subject of a follow-up plan once the foundation is solid.

## Scope Decisions (Already Made)

These are settled. Do not relitigate during execution.

**Engine:**
- Drop the `Result` generic entirely (no `complete` return status, no `results: Result[]` in snapshot)
- Drop the `context` escape hatch entirely
- Drop `cachedData` from the `step` (formerly `updateData`) signature
- Remove the `loop` config (consumers can re-init themselves if they want looping)
- Collapse `isPlaying` + `canPlay` + `didInit` into a single `status: 'idle' | 'playing' | 'paused' | 'stopped'` discriminant
- Resolve eager-vs-lazy init by choosing eager and removing the `didInit` guards
- Termination via a separate optional `shouldStop: (data, params) => boolean` predicate, not via step return values
- `step` returns `Data` directly, not a tagged union

**Component API:**
- One unified `<Simulation>` component
- `sim` prop for main-thread sims, `worker` prop (taking a module loader) for worker sims
- Same sim module file works in both cases — only the consuming prop differs
- Cut `WorkerRenderSimulation`, `selectRenderState`, worker-side `draw`, OffscreenCanvas support, `canvasLeases` entirely

**Sim module shape:**
- `defineSim<Data, Params>({ init, step, defaultParams })` helper for inference
- Default export is the defined sim
- `init(params)` — takes params directly, not an object
- `step({ data, params, tick })` — takes a destructured object
- `defaultParams` provides params at module level; component-level `params` prop overrides

**Params reactivity:**
- Two methods: `setParams(patch)` for live updates, `resetWith(patch)` for re-init
- Drop the `{ reset }` options object

**History:**
- Not in engine config. A separate consumer-level opt-in via a `useSimulationHistory()` hook.
- Engine does not retain tick history unless the hook is subscribed.
- History hook accepts an optional retention policy (all / last N).

**Type rules (non-negotiable):**
- No `as` casts except at the worker wire boundary. Centralize wire casts in one `serialize`/`deserialize` pair with comments.
- No `unknown` except at the worker wire boundary.
- No generic bounds wider than `Record<string, unknown>`. Prefer no bound.
- No `AnyModule`/`AnySnapshot` aliases. Generics flow end-to-end.
- Every cast requires a comment explaining why it's necessary.

**Controls:** Rebuild to use the cleanly-typed context. Same primitives, same `StandardControls`, but no generic gymnastics at call sites.

**Package structure:** Keep the `react-sim-engine` / `react-sim-react` monorepo split.

**Examples to port (curated subset):** Game of Life (trivial), Snake (motivating), Epidemic or Segregation (complex params), and one worker-backed port. Leave the rest for a follow-up.

## Open Questions for Design Phase

These are the decisions Task 1 (the design doc) must resolve. They were not settled in pre-planning because they depend on implementation detail.

- Exact shape of the `worker` prop: `() => import('./sim')` vs. `new URL('./sim', import.meta.url)` vs. both. Default-export convention confirmed; loader shape needs a call.
- Worker wire format: message protocol, request/response pattern, error propagation.
- How `setParams`/`resetWith` behave mid-playback (pause first? continue? configurable?).
- Whether `step` can be async. Recommendation: no. Confirm in design doc.
- How the history hook subscribes without forcing the engine to always record (probably: hook existence triggers recording; unsubscribe stops it).
- RAF loop ownership: React component owns RAF in main-thread case, worker owns its own loop in worker case. Confirm and document.

---

## Tasks

### Task 1: Write the API Design Document + CLAUDE.md
**Depends on:** nothing
**Output:** Two markdown files: `packages/DESIGN.md` (API spec) and `CLAUDE.md` at the repo root (conventions for agents).

**Sub-task 1a: DESIGN.md**

Write a design document that fully specifies the new API before any implementation. It must include:

1. **Mental model** — one paragraph explaining what react-sim is and is not. Tight.
2. **The simple case** — a complete, runnable code example of a main-thread sim (< 30 lines). Something trivial like a counter or random walk. Consumer-facing code only.
3. **The worker case** — the same sim converted to worker mode, showing exactly which lines change.
4. **The sim module contract** — full TypeScript signature of `defineSim`, `init`, `step`, `defaultParams`. Include JSDoc for each field.
5. **The `<Simulation>` component API** — full props table with types, defaults, and one-sentence descriptions.
6. **The hook API** — `useSimulation<Data, Params>()` and `useSimulationHistory<Data>(policy?)`. Return types fully specified.
7. **The engine API** — the `createEngine` factory and the `SimulationEngine` interface it returns. Include the state machine (`status` transitions, what triggers each).
8. **The worker wire format** — message kinds, request/response pairing, error shapes. This is the only place `unknown` is allowed and it must be clearly demarcated.
9. **The control primitives** — updated signatures after the context typing is fixed. Show one example using `<StandardControls>`.
10. **Migration notes for the example ports** — how today's `initData`/`updateData` maps to tomorrow's `init`/`step`.
11. **Resolution of the six open questions listed above.** Each gets a decision and a one-sentence rationale.

The document must be specific enough that an agent implementing any single task can refer to it without needing to make design calls. If during implementation a task reveals the design doc was ambiguous, stop and revise the doc first.

**Sub-task 1b: CLAUDE.md**

Write a `CLAUDE.md` at repo root that captures project conventions. Must include:

- Project structure (where `react-sim-engine`, `react-sim-react`, `apps/react-sim-docs` live)
- Type-safety rules (the non-negotiable list above)
- Testing expectations (vitest in the engine, what to test)
- Which parts of the repo are legacy (`/src`, `/gatsby`) and must not be touched
- A note on scope: this rewrite is library-only; the 3D snake demo is a separate future plan

**Done criteria:** Both files exist, DESIGN.md answers every open question, you've read the design doc and given sign-off before Task 2 starts.

---

### Task 2: New Engine Core (pure, no React)
**Depends on:** Task 1
**Output:** `packages/react-sim-engine/src/engine.ts` rewritten from scratch, matching the design doc.

- `createEngine<Data, Params>(config)` factory returning a `SimulationEngine<Data, Params>` instance
- Single `status` state machine. All state transitions explicit.
- Methods: `play`, `pause`, `stop`, `seek`, `step`, `setParams`, `resetWith`, `getSnapshot`, `subscribe`, `handleAnimationFrame`
- `shouldStop` predicate wired in as termination
- Snapshot shape: `{ status, data, params, tick }` — no `isPlaying`/`canPlay`/`results`/`cachedData`
- No eager init weirdness. Factory initializes; there's no lazy path.
- No generic bounds wider than `Record<string, unknown>` (prefer none)
- No `unknown`, no `as`, no helper aliases that erase generics

**Done criteria:** engine.ts compiles with strict TypeScript. Unit tests cover all status transitions, `shouldStop` behavior, `setParams` vs `resetWith`, seek behavior. No test uses `as` casts.

---

### Task 3: `defineSim` + Sim Module Types
**Depends on:** Task 1
**Output:** `packages/react-sim-engine/src/sim.ts` (new file) with the `defineSim` helper and the `SimulationModule` type.

- `defineSim<Data, Params>(sim): SimulationModule<Data, Params>` — identity function for inference
- `SimulationModule<Data, Params>` type with `init`, `step`, `shouldStop?`, `defaultParams`
- `init(params: Params): Data`
- `step({ data, params, tick }: StepArgs<Data, Params>): Data`
- Full JSDoc on each field
- Exported from the package root

**Parallelizable with Task 2.**

**Done criteria:** A consumer can write `defineSim<{ n: number }, { start: number }>({ init, step, defaultParams })` and get full inference in the `init`/`step` bodies without type annotations.

---

### Task 4: Worker Runner + Wire Protocol
**Depends on:** Tasks 2, 3
**Output:** `packages/react-sim-engine/src/worker/` directory with the worker plumbing.

- Wire protocol as defined in DESIGN.md
- `createWorkerRunner(options)` on the main-thread side: creates worker, sends messages, subscribes to snapshots
- Worker entry file that imports the sim module and drives the engine inside the worker
- `serialize` / `deserialize` functions: the *only* place `unknown` and `as` casts are allowed. Both functions have header comments explaining the boundary.
- Request/response pairing with error propagation
- RAF loop owned by the worker (worker's own animation loop, not main-thread ticks)
- Clean dispose semantics (worker terminates, no lingering listeners)

**Done criteria:** An e2e test starts a worker, runs a sim for N ticks, pauses, seeks, resets with new params, and terminates cleanly. No leaks. Worker code is fully typed; main-thread code is fully typed; the wire format in between is the only boundary.

---

### Task 5: React `<Simulation>` Component + Hooks + Context
**Depends on:** Tasks 2, 3, 4
**Output:** `packages/react-sim-react/src/` rebuilt — single `<Simulation>` component, clean context, two hooks.

- `<Simulation sim={...}>` for main-thread case. `<Simulation worker={() => import(...)}>` for worker case. Mutually exclusive props, typed as a discriminated union at the component level.
- `SimulationContext` typed properly with generics, no `unknown` runtime value
- `useSimulation<Data, Params>()` — one hook, works for both main and worker cases
- `useSimulationHistory<Data>(policy?)` — opt-in history recording
- Main-thread path owns its RAF loop; worker path subscribes to worker-driven snapshots
- Delete: `WorkerSimulation.tsx`, `WorkerRenderSimulation.tsx`, `canvasLeases`, old `SimulationContext.tsx`, the dual hook file, `useSimulationEngine` deprecated alias

**Done criteria:** A consumer imports `<Simulation>`, `useSimulation`, `defineSim` from the packages and builds a working main-thread sim. Switching to worker is changing one prop. Types are correct end-to-end; no casts in consumer code.

---

### Task 6: Control Primitives Rebuild
**Depends on:** Task 5
**Output:** `packages/react-sim-react/src/controls/` — controls rebuilt against the new context.

- `<PlayPauseButton>`, `<StopButton>`, `<StepButton>`, `<TickSeekSlider>`, `<ParamRangeField>`, `<ParamToggleField>`, `<TickReadout>`
- `<StandardControls>` batteries-included
- `ParamRangeField` / `ParamToggleField` pick up the Params type from context — no per-use generic pass-through
- Status-aware disabled states (e.g., step disabled when playing or stopped)
- Drop the inline styles objects into a colocated CSS module or small style helper so consumers can override easily

**Done criteria:** A consumer uses `<StandardControls controls={[...]} maxTime={...} />` and gets a working control strip. No `as` casts, no generic gymnastics.

---

### Task 7: Port Game of Life Example
**Depends on:** Tasks 3, 5, 6
**Output:** `apps/react-sim-docs/src/sims/gameOfLifeSim.ts` rewritten and its page using it.

- Use `defineSim` and the new API
- Main-thread sim (no worker — it's cheap)
- Page uses `<Simulation>` + `<StandardControls>` + a simple canvas or DOM render
- This is the smoke test — if the API feels bad writing this, stop and fix the API before porting more

**Done criteria:** Running the docs app shows a working Game of Life. Source is shorter and clearer than the old version. No casts, no awkward generic calls.

---

### Task 8: Port Snake Example (Worker-Backed)
**Depends on:** Task 7
**Output:** `apps/react-sim-docs/src/sims/snakeSim.ts` rewritten and its page using it.

- Same sim module file structure as Game of Life
- Page uses `<Simulation worker={() => import('./snakeSim')}>` to run the solver in a worker
- Canvas render on the main thread, reading from `useSimulation`
- Preserve the solver logic (Hamiltonian circuit, shortest path, etc.) — this is a port, not a reimagining. Solver helpers can be extracted but must produce identical behavior.

**Done criteria:** Running the docs app shows a working snake solver in a worker. Main-thread frame rate remains high while the solver runs. The sim module looks structurally identical to Game of Life except for what `step` does.

---

### Task 9: Port Two More Examples + Docs Cleanup
**Depends on:** Task 8
**Output:** Two more sims ported (Epidemic and one other — your call based on which exercises the API most), plus the docs app navigation/layout cleaned to match.

- Epidemic exercises complex params, reset-on-param-change, possibly `shouldStop`
- The second pick should stress something the others don't — suggest Langton's Ant or Segregation
- Remove ported-but-not-rewritten example pages if they'd break the docs app
- Ensure all docs app routes work

**Done criteria:** The docs app has four working ported examples. The rest of the old examples are either ported, removed from the nav, or marked "legacy" clearly. No build errors.

---

### Task 10: Final Sweep — Tests, Types, Docs
**Depends on:** Tasks 2–9
**Output:** Everything tied off.

- Full `tsc --noEmit` clean across both packages and the docs app
- `vitest run` green across both packages
- Existing Playwright e2e test (`canvas-updates.spec.ts`) updated or replaced to cover the new API
- `packages/react-sim-engine/README.md` and `packages/react-sim-react/README.md` rewritten to reflect the new API (short, with the examples from DESIGN.md)
- Root `README.md` updated

**Done criteria:** Clean build, green tests, updated READMEs. A new user could land on the repo and understand how to use react-sim from the READMEs alone.

---

## Parallelization Notes

**Sequential bottlenecks:**
- Task 1 (design doc) gates everything. It must be reviewed and signed off before implementation starts.
- Task 5 (React component) depends on Tasks 2, 3, 4.
- Task 7 (Game of Life port) is the smoke test. If it feels bad, stop and revise — don't port more.

**Parallelizable:**
- Tasks 2 (engine) and 3 (defineSim) can run concurrently. Two agents, two worktrees. They share no files.
- Task 6 (controls) can start the moment Task 5's context/hooks are stable, even before Task 5 is fully polished.
- Tasks 8 and 9 (example ports) are mechanically independent. Three agents could port three sims in parallel. But — do Task 7 first, solo, as the API sanity check.

**Recommended agent orchestration:**
1. You (or one focused agent) writes Task 1. Review carefully.
2. Two agents in parallel: Task 2 + Task 3.
3. One agent: Task 4 (depends on 2 + 3).
4. One agent: Task 5 (depends on 2 + 3 + 4).
5. One agent: Task 6 (can start mid-Task 5 if the context is stable).
6. You (or one agent, solo): Task 7. This is the design-validation gate.
7. Parallel agents: Tasks 8 + 9.
8. One agent: Task 10.

## What Success Looks Like

- A consumer can write a main-thread sim in under 30 lines using `defineSim` + `<Simulation>` + `useSimulation`.
- Switching that sim to run in a worker is a one-prop change. The sim module file is identical.
- The library has no `as unknown`, no `object` bounds, no `AnyModule` aliases. Types flow from consumer call sites down to the engine and stop at the worker wire.
- Four example sims run in the docs app, demonstrating main-thread and worker cases.
- A new contributor reading `DESIGN.md` and `CLAUDE.md` can find their way around without asking questions.

## Out of Scope

- The 3D snake time-cube demo (future plan — inherits this foundation)
- Porting all 20 examples (future plan — follow-up sweep)
- Publishing to npm
- A documentation site beyond the current docs app
- Performance benchmarking vs. the old (main branch) implementation