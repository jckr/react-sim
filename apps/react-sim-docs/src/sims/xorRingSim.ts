import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import type { UpdateResult } from 'react-sim-engine/types';

export type XorRingParams = { cells: number; density: number };
export type XorRingData = number[];
/** Mode 2: same as sim data — the ring of 0/1 cells (small payload vs full cached history). */
export type XorRingRenderState = XorRingData;

export const defaultParams: XorRingParams = { cells: 240, density: 0.35 };

export function initData(params: XorRingParams): XorRingData {
  return Array.from({ length: params.cells }, () => (Math.random() < params.density ? 1 : 0));
}

export function updateData({ data, params }: { data: XorRingData; params: XorRingParams }): UpdateResult<XorRingData> {
  const n = params.cells;
  const next = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    const left = data[(i - 1 + n) % n];
    const right = data[(i + 1) % n];
    next[i] = left ^ right;
  }
  return { status: 'continue', data: next };
}

export function draw({
  ctx,
  snapshot
}: {
  ctx: OffscreenCanvasRenderingContext2D;
  snapshot: { data: XorRingData; params: XorRingParams };
}) {
  const { cells } = snapshot.params;
  const h = 56;
  const canvas = ctx.canvas;
  if (canvas.width !== cells) canvas.width = cells;
  if (canvas.height !== h) canvas.height = h;

  ctx.fillStyle = '#f6f6f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#111';
  for (let i = 0; i < cells; i++) {
    if (snapshot.data[i]) ctx.fillRect(i, 0, 1, h);
  }

  if ('commit' in ctx && typeof ctx.commit === 'function') {
    ctx.commit();
  }
}

export const module: SimulationModule<XorRingData, XorRingParams, XorRingRenderState, unknown> = {
  initData,
  updateData: ({ data, params }) => updateData({ data, params }),
  selectRenderState: (snapshot) => snapshot.data,
  draw,
  defaultParams
};
