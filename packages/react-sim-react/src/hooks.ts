import React from 'react';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextValue, WorkerRenderSimulationContextValue } from './SimulationContext';

/**
 * Read simulation state and actions from the nearest `<Simulation>` provider (main-thread engine).
 * Pass explicit type parameters for `data`, `params`, and optional completion `result` type.
 *
 * For **`WorkerRenderSimulation`**, the runtime `data` payload is **`Data | RenderState | null`** (see
 * `WorkerRenderSimulationContextValue`). Use `useWorkerRenderSimulationContext` so those types are not lost.
 *
 * @example
 * const { data, tick, play, stepOnce } = useSimulationContext<{ cells: number[] }, { width: number }, void>();
 */
export function useSimulationContext<
  Data = unknown,
  Params extends object = object,
  Result = unknown
>(): SimulationContextValue<Data, Params, Result> {
  const ctx = React.useContext(SimulationContext);

  if (!ctx) {
    throw new Error('useSimulationContext must be used within a <Simulation>');
  }

  return ctx as SimulationContextValue<Data, Params, Result>;
}

/**
 * Read state from the nearest `<WorkerRenderSimulation>` provider. `data` is typed as the union of full engine
 * **`Data`** (envelope `kind: 'data'`) and **`RenderState`** (`kind: 'renderState'`), plus `null` for the initial
 * placeholder before the worker snapshot arrives.
 */
export function useWorkerRenderSimulationContext<
  Data,
  Params extends object,
  RenderState,
  Result = unknown
>(): WorkerRenderSimulationContextValue<Data, Params, RenderState, Result> {
  const ctx = React.useContext(SimulationContext);

  if (!ctx) {
    throw new Error('useWorkerRenderSimulationContext must be used within a <WorkerRenderSimulation>');
  }

  return ctx as WorkerRenderSimulationContextValue<Data, Params, RenderState, Result>;
}

/** @deprecated Use `useSimulationContext` for clearer naming. */
export const useSimulationEngine = useSimulationContext;
