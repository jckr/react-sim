import { defineSim } from 'react-sim-engine/sim';

export type FibonacciParams = Record<string, never>;

export type FibonacciData = number[];

export default defineSim<FibonacciData, FibonacciParams>({
  defaultParams: {},

  init: () => [0],

  step: ({ data, tick }) => {
    if (tick === 1) {
      return [0, 1];
    }
    const lastNumber = data[tick - 1] + data[tick - 2];
    return [...data, lastNumber];
  },
});
