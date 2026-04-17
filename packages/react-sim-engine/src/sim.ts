/** Arguments passed to the `step` function on each tick. */
export type StepArgs<Data, Params> = {
  data: Data;
  params: Params;
  tick: number;
};

/** A simulation module: the pure business logic that react-sim drives. */
export type SimModule<Data, Params> = {
  /** Create initial simulation state from params. Called on engine creation and on resetWith(). */
  init: (params: Params) => Data;

  /** Advance the simulation by one tick. Must be pure and synchronous. */
  step: (args: StepArgs<Data, Params>) => Data;

  /** Optional termination predicate. Checked after each step. If it returns true, the simulation stops. */
  shouldStop?: (data: Data, params: Params) => boolean;

  /** Default parameter values. Used at engine creation if no params override is provided. */
  defaultParams: Params;
};

/**
 * Define a simulation module with full type inference.
 *
 * This is an identity function — it returns its argument unchanged. Its purpose is to
 * enable TypeScript to infer `Data` and `Params` from the `init` and `step` implementations,
 * so the developer never needs to annotate types inside those functions.
 *
 * @example
 * ```ts
 * export default defineSim<{ count: number }, { increment: number }>({
 *   defaultParams: { increment: 1 },
 *   init: (params) => ({ count: 0 }),
 *   step: ({ data, params }) => ({ count: data.count + params.increment }),
 * });
 * ```
 */
export function defineSim<Data, Params>(
  sim: SimModule<Data, Params>
): SimModule<Data, Params> {
  return sim;
}

/** Extract the Data type from a SimModule. */
export type SimData<M> = M extends SimModule<infer D, infer _P> ? D : never;

/** Extract the Params type from a SimModule. */
export type SimParams<M> = M extends SimModule<infer _D, infer P> ? P : never;
