import { defineSim } from 'react-sim-engine/sim';

/** No evolving dataset — the view is driven by `tick` only. */
export type SimpleModelParams = Record<string, never>;
export type SimpleModelData = Record<string, never>;

export default defineSim<SimpleModelData, SimpleModelParams>({
  defaultParams: {},

  init: () => ({}),

  step: () => ({}),
});
