import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import type { UpdateResult } from 'react-sim-engine/types';

/** Canvas size in CSS pixels; grid is logical cells scaled to fit. */
export type LangtonParams = {
  width: number;
  height: number;
  gridWidth: number;
  gridHeight: number;
};

export type LangtonData = {
  cells: Uint8Array;
  gridWidth: number;
  gridHeight: number;
  antX: number;
  antY: number;
  /** 0 = north, 1 = east, 2 = south, 3 = west */
  dir: number;
};

/** Full grid + ant position each frame (small enough to clone cheaply). */
export type LangtonRenderState = LangtonData;

const DX = [0, 1, 0, -1] as const;
const DY = [-1, 0, 1, 0] as const;

export function initData(params: LangtonParams): LangtonData {
  const { gridWidth: gw, gridHeight: gh } = params;
  const cells = new Uint8Array(gw * gh);
  return {
    cells,
    gridWidth: gw,
    gridHeight: gh,
    antX: Math.floor(gw / 2),
    antY: Math.floor(gh / 2),
    dir: 0
  };
}

export function updateData(args: {
  data: LangtonData;
  params: LangtonParams;
  tick: number;
  cachedData: Record<number, LangtonData>;
}): UpdateResult<LangtonData> {
  const { data } = args;
  const { gridWidth: gw, gridHeight: gh } = data;
  const cells = new Uint8Array(data.cells);
  let { antX: x, antY: y, dir } = data;
  const idx = y * gw + x;
  const onWhite = cells[idx] === 0;
  cells[idx] = onWhite ? 1 : 0;
  dir = onWhite ? (dir + 1) % 4 : (dir + 3) % 4;
  x = (x + DX[dir] + gw) % gw;
  y = (y + DY[dir] + gh) % gh;
  return {
    status: 'continue',
    data: {
      cells,
      gridWidth: gw,
      gridHeight: gh,
      antX: x,
      antY: y,
      dir
    }
  };
}

export const module: SimulationModule<LangtonData, LangtonParams, LangtonRenderState, unknown> = {
  initData,
  updateData,
  selectRenderState: (snapshot) => ({
    cells: snapshot.data.cells,
    gridWidth: snapshot.data.gridWidth,
    gridHeight: snapshot.data.gridHeight,
    antX: snapshot.data.antX,
    antY: snapshot.data.antY,
    dir: snapshot.data.dir
  }),
  defaultParams: {
    width: 332,
    height: 332,
    gridWidth: 83,
    gridHeight: 83
  }
};
