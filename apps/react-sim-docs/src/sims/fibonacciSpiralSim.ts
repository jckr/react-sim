import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import {
  initData as initFib,
  updateData as updateFib,
  type FibonacciData,
  type FibonacciParams
} from './fibonacciSim';

export type FibonacciSpiralParams = { size: number };
export type FibonacciSpiralRenderState = { size: number };

const phi = 0.5 + Math.sqrt(5) / 2;

const D = {
  0: 'right',
  1: 'down',
  2: 'left',
  3: 'up'
} as const;

/** Main-thread canvas draw (same geometry as legacy `CanvasFrame` example). */
export function drawFibonacciSpiral(
  ctx: CanvasRenderingContext2D,
  args: { size: number; tick: number }
): void {
  const { size, tick } = args;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  let x = 0;
  let y = 0;
  let side = size;
  for (let i = 0; i < tick; i++) {
    const d = D[i % 4 as 0 | 1 | 2 | 3];
    side = side / phi;
    ctx.strokeStyle = '#ddd';
    ctx.strokeRect(x, y, side, side);
    ctx.strokeStyle = '#222';

    const radius = Math.max(0, side - 1);
    switch (d) {
      case 'right':
        ctx.beginPath();
        ctx.arc(x + side, y + side, radius, Math.PI, -Math.PI / 2);
        ctx.stroke();
        ctx.closePath();
        x = x + side;
        break;
      case 'down':
        ctx.beginPath();
        ctx.arc(x, y + side, radius, -Math.PI / 2, 0);
        ctx.stroke();
        ctx.closePath();
        x = x + (1 - 1 / phi) * side;
        y = y + side;
        break;
      case 'left':
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI / 2);
        ctx.stroke();
        ctx.closePath();
        x = x - side / phi;
        y = y + (1 - 1 / phi) * side;
        break;
      case 'up':
        ctx.beginPath();
        ctx.arc(x + side, y, radius, Math.PI / 2, Math.PI);
        ctx.stroke();
        ctx.closePath();
        y = y - side / phi;
        break;
      default:
        break;
    }
  }
}

const emptyFibParams: FibonacciParams = {};

export const module: SimulationModule<FibonacciData, FibonacciSpiralParams, FibonacciSpiralRenderState, unknown> = {
  initData: (_params: FibonacciSpiralParams) => initFib(emptyFibParams),
  updateData: (args) =>
    updateFib({
      data: args.data,
      params: emptyFibParams,
      tick: args.tick
    }),
  selectRenderState: (snapshot) => ({ size: snapshot.params.size }),
  defaultParams: { size: 332 }
};
