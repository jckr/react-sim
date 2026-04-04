import type { UpdateResult } from 'react-sim-engine/types';

export type FirstLineMode = 'blank' | 'full' | 'random';

export type Automata1dParams = {
  rule: number;
  cols: number;
  rows: number;
  firstLine: FirstLineMode;
};

export type Automata1dData = number[];

export function initData(params: Automata1dParams): Automata1dData {
  const { cols, firstLine } = params;
  const data = Array<number>(cols).fill(0);
  data[Math.floor(data.length / 2)] = 1;
  if (firstLine === 'blank') {
    return data;
  }
  if (firstLine === 'full') {
    return data.map(() => 1);
  }
  return data.map(() => (Math.random() > 0.5 ? 1 : 0));
}

export function updateData(args: {
  data: Automata1dData;
  params: Automata1dParams;
  tick: number;
}): UpdateResult<Automata1dData> {
  const { data, params } = args;
  const { rule } = params;
  const next = data.map((cell, i) => {
    const left = data[i - 1];
    const mid = data[i];
    const right = data[i + 1];
    const bit = (left ? 4 : 0) + (mid ? 2 : 0) + (right ? 1 : 0);
    const output = rule & (1 << bit);
    return output;
  });
  return { status: 'continue', data: next };
}
