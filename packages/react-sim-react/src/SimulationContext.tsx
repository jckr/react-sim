import React from 'react';
import type { SimulationStatus } from 'react-sim-engine';

export type SimulationContextValue<Data, Params> = {
  // State
  data: Data;
  params: Params;
  tick: number;
  status: SimulationStatus;

  // Actions
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: number) => void;
  advance: (count?: number) => void;
  setParams: (patch: Partial<Params>) => void;
  resetWith: (patch?: Partial<Params>) => void;
};

/**
 * Runtime context value uses `unknown` for data/params since React.createContext
 * cannot be generic. The useSimulation hook casts to the correct types.
 */
type RuntimeContextValue = SimulationContextValue<unknown, unknown>;

export const SimulationContext =
  React.createContext<RuntimeContextValue | null>(null);
