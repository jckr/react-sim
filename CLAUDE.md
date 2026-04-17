# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

react-sim is a React simulation engine library for building tick-based state simulations. It uses an npm workspaces monorepo with three main areas:

- **`packages/react-sim-engine`** — Pure TypeScript simulation engine (framework-agnostic). `createEngine<Data, Params>()` factory with tick progression, play/pause/seek/advance, and web worker support.
- **`packages/react-sim-react`** — React adapter layer. Single `<Simulation>` component (`sim` prop for main-thread, `worker` prop for web worker); `useSimulation()` hook; `StandardControls` UI.
- **`apps/react-sim-docs`** — Vite + MDX documentation site with interactive demo simulations.

**Legacy code (do not modify):**
- **`/src`** — Old components (Model, Controls, CanvasFrame, etc.). Being replaced by workspace packages.
- **`/gatsby`** — Old documentation site. Not part of the current build.

## Active Rewrite

The library is undergoing a full API rewrite. The core objective: make it as simple as possible for a developer to build tick-based simulations — they provide only business logic (init, step, render, params) and the library handles everything else (loop, timing, state machine, controls, workers). The API succeeds if using it is less work than building from scratch.

See `packages/DESIGN.md` for the authoritative API specification. Key points:
- Two generics only: `<Data, Params>` (the `Result` generic has been dropped)
- `defineSim()` helper for type inference in sim modules
- `step` returns `Data` directly (no tagged union / status envelope)
- Termination via `shouldStop` predicate, not return values
- Engine status: `'idle' | 'playing' | 'paused' | 'stopped'` (single discriminant)
- `advance(n)` replaces the old `stepOnce(n)` method

## Commands

```bash
# Install
npm install

# Build workspace packages (must build engine before react)
npm run build:packages

# Build legacy root package
npm run build

# Run all checks (unit + lint + build)
npm test

# Unit tests only (vitest, node environment)
npm run test:unit

# Watch mode
npm run test:watch

# Engine package tests only
npm run test:engine

# Lint
npm run test:lint

# E2E tests (Playwright, launches dev server on :5173)
npm run test:e2e

# Start docs dev server
npm run dev -w react-sim-docs
```

## Architecture

**Engine** (`react-sim-engine`): `createEngine<Data, Params>()` factory returns a `SimulationEngine` managing a status state machine (`idle → playing ⇄ paused → stopped`). Snapshot shape: `{ data, params, tick, status }`. History recording is opt-in via `subscribeHistory`.

**Sim modules**: Defined via `defineSim<Data, Params>({ init, step, shouldStop?, defaultParams })`. The same module file works for both main-thread and worker execution.

**React adapter** (`react-sim-react`): Single `<Simulation>` component — use `sim` prop for main-thread, `worker` prop for web worker. `useSimulation()` hook provides state + actions. Public API uses multiple explicit `package.json` exports.

**Docs app**: React Router navigation, MDX pages, canvas-based rendering for demos. Vite + @mdx-js/rollup.

## Code Standards

- **No `any`** — use generics, discriminated unions, type guards.
- **No double assertions** (`as unknown as Y`) — model types properly.
- **No `as` casts** except at the worker wire boundary. Centralize wire casts in `serialize.ts`/`deserialize.ts` with comments explaining each cast.
- **No `unknown`** except at the worker wire boundary. Immediately narrow at boundaries using type guards or schema validation.
- **No generic bounds wider than `Record<string, unknown>`** — prefer no bound at all.
- **No `AnyModule`/`AnySnapshot` aliases** that erase generics. Generics flow end-to-end.
- **No barrel files** — no `index.ts` re-export patterns. Public API defined via `package.json` `exports` with multiple explicit entry points. Internal imports go directly to concrete source files.
- **No circular imports** — refactor shared types into a neutral module if needed.
- **Don't disable ESLint rules** unless fixing the root cause would require unreasonable effort; leave a comment if disabled.
- **Idiomatic React** — hooks, stable callbacks, effects with correct cleanup, no conditional hook calls.
- These rules apply incrementally to all existing code, not just new code.

## Testing

- **Engine**: Vitest unit tests. Cover all status transitions, `shouldStop` behavior, `setParams` vs `resetWith`, seek/advance. No `as` casts in test code.
- **React adapter**: Vitest. Test component mounting, hook returns, context propagation.
- **Docs app**: Playwright e2e tests against the dev server (chromium, port 5173).
- Test environment is `node` (not jsdom) — keep tests focused on logic, not DOM.

## Formatting

Prettier: single quotes, semicolons, 2-space indent, bracket spacing, arrow parens always.

## Tech Stack

TypeScript 5.9, React 18, Node >=22.12. Bundling: tsup (packages), Vite (docs), microbundle (legacy root). Testing: Vitest (unit, node env), Playwright (e2e, chromium). Linting: ESLint 9 + Prettier.
