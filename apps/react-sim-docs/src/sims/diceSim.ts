import type { UpdateResult } from 'react-sim-engine/types';

export type DiceParams = { nbDice: number };

export type DiceData = {
  rolls: number[];
  average: number;
  total: number;
  /** Count per possible sum (nbDice … 6*nbDice). */
  totals: Record<number, number>;
};

function roll(random: () => number): number {
  return Math.ceil(random() * 6);
}

export function initData(params: DiceParams): DiceData {
  return {
    rolls: [],
    average: 3.5 * params.nbDice,
    total: 0,
    totals: {}
  };
}

export function updateData(args: {
  data: DiceData;
  params: DiceParams;
  tick: number;
}): UpdateResult<DiceData> {
  const { data, params, tick } = args;
  const { nbDice } = params;
  const rolls: number[] = [];
  let total = 0;
  for (let i = 0; i < nbDice; i++) {
    const r = roll(Math.random);
    rolls.push(r);
    total += r;
  }
  const updatedTotals = { ...data.totals, [total]: (data.totals[total] ?? 0) + 1 };
  const average = (data.average * (tick - 1) + total) / tick;
  return {
    status: 'continue',
    data: { rolls, average, total, totals: updatedTotals }
  };
}
