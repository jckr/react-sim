import type { UpdateResult } from 'react-sim-engine/types';

/** No evolving dataset — the view is driven by `tick` only. */
export type SimpleModelParams = Record<string, never>;
export type SimpleModelData = Record<string, never>;

export function initData(_params: SimpleModelParams): SimpleModelData {
  return {};
}

export function updateData(_args: {
  data: SimpleModelData;
  params: SimpleModelParams;
  tick: number;
}): UpdateResult<SimpleModelData> {
  return { status: 'continue', data: {} };
}
