import React from 'react';
import { SimulationContext } from './SimulationContext';
import type { SimulationContextValue } from './SimulationContext';
import type { SimModule } from 'react-sim-engine/sim';

/**
 * Helper type: extract Data and Params from a SimModule type, or use them directly.
 *
 * Supports two usage patterns:
 *   useSimulation<typeof mySim>()          — infers Data & Params from the module
 *   useSimulation<MyData, MyParams>()      — explicit type parameters
 */
type InferSimTypes<T, FallbackParams = unknown> = T extends SimModule<
  infer D,
  infer P
>
  ? SimulationContextValue<D, P>
  : SimulationContextValue<T, FallbackParams>;

/**
 * Read simulation state and actions from the nearest `<Simulation>` provider.
 *
 * @example
 * // Infer types from the sim module:
 * const { data, tick, play } = useSimulation<typeof counterSim>();
 *
 * // Or provide types explicitly:
 * const { data } = useSimulation<{ count: number }, { increment: number }>();
 */
export function useSimulation<
  T = unknown,
  FallbackParams = unknown,
>(): InferSimTypes<T, FallbackParams> {
  const ctx = React.useContext(SimulationContext);

  if (!ctx) {
    throw new Error('useSimulation must be used within a <Simulation>');
  }

  return ctx as InferSimTypes<T, FallbackParams>;
}
