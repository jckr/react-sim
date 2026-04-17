import { defineSim } from 'react-sim-engine/sim';

export type CounterData = { value: number };
export type CounterParams = { step: number; start: number };

export default defineSim<CounterData, CounterParams>({
  defaultParams: { start: 0, step: 1 },

  init: (params) => ({ value: params.start }),

  step: ({ data, params }) => ({ value: data.value + params.step }),
});
