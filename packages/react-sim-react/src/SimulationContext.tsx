import React from 'react';

export type SimulationActions<Params extends object> = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: number) => void;
  /** Advance by N ticks while paused (default 1). */
  stepOnce: (count?: number) => void;
  setParams: (nextParams: Partial<Params>, opts?: { reset?: boolean }) => void;
};

export type SimulationContextValue<Data, Params extends object, Result> = SimulationActions<Params> & {
  data: Data;
  tick: number;
  params: Params;
  cachedData: Record<number, Data>;
  results: Result[];
  isPlaying: boolean;
  canPlay: boolean;
};

/**
 * Snapshot exposed by {@link WorkerRenderSimulation}: `unwrap` yields **full engine `Data`** when the
 * envelope is `kind: 'data'`, and **`RenderState`** from `selectRenderState` when `kind: 'renderState'`.
 * The placeholder snapshot uses `initialData` (often `undefined`), so `data` may be `null` before the worker runs.
 */
export type WorkerRenderSimulationContextValue<
  Data,
  Params extends object,
  RenderState,
  Result
> = SimulationActions<Params> & {
  data: Data | RenderState | null;
  tick: number;
  params: Params;
  cachedData: Record<number, Data>;
  results: Result[];
  isPlaying: boolean;
  canPlay: boolean;
};

/**
 * Single concrete shape for `createContext` / `Provider.value`. Generics live on
 * `Simulation` + `useSimulationContext`; the hook maps this to `SimulationContextValue<D,P,R>`.
 *
 * `setParams` is intentionally `(object, …)` so a real `Partial<Params>` implementation
 * is assignable without a Provider-side cast (contravariance on params is the usual blocker).
 */
export type SimulationContextRuntimeValue = {
  data: unknown;
  tick: number;
  params: object;
  cachedData: Record<number, unknown>;
  results: unknown[];
  isPlaying: boolean;
  canPlay: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: number) => void;
  stepOnce: (count?: number) => void;
  setParams: (next: object, opts?: { reset?: boolean }) => void;
};

export const SimulationContext = React.createContext<SimulationContextRuntimeValue | null>(null);

