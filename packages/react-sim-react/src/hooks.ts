import React from 'react';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextValue } from './SimulationContext';

/**
 * Read simulation state and actions from the nearest `<Simulation>` provider.
 * Pass explicit type parameters for `data`, `params`, and optional completion `result` type.
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

/** @deprecated Use `useSimulationContext` for clearer naming. */
export const useSimulationEngine = useSimulationContext;
