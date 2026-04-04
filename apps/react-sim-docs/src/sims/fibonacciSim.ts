import type { UpdateResult } from 'react-sim-engine/types';

export type FibonacciParams = Record<string, never>;

export type FibonacciData = number[];

export function initData(_params: FibonacciParams): FibonacciData {
  return [0];
}

export function updateData(args: {
  data: FibonacciData;
  params: FibonacciParams;
  tick: number;
}): UpdateResult<FibonacciData> {
  const { data, tick } = args;
  if (tick === 1) {
    return { status: 'continue', data: [0, 1] };
  }
  const lastNumber = data[tick - 1] + data[tick - 2];
  return { status: 'continue', data: [...data, lastNumber] };
}
