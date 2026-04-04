export const HALF_SQRT3 = Math.sqrt(3) / 2;
export const P = Math.PI;
export const P2 = Math.PI * 2;

export function getColRow(id: number, cols: number): { col: number; row: number } {
  const col = id % cols;
  const row = (id - col) / cols;
  return { col, row };
}

export function norm(a: number): number {
  return (a + P2) % P2;
}

export function average(a0: number, a1: number): number {
  let min = Math.min(norm(a0), norm(a1));
  let max = Math.max(norm(a0), norm(a1));
  if (max - min > P) {
    return norm(min + (max - min) / 2 + P);
  }
  return norm(min + (max - min) / 2);
}

export function getRadius(layer: number, cellSize: number): number {
  return (layer + 0.5) * cellSize;
}

export function acuteArc(args: { ctx: CanvasRenderingContext2D; x: number; y: number; r: number; a0: number; a1: number }): void {
  const { ctx, x, y, r, a0, a1 } = args;
  const angle0 = norm(a0);
  const angle1 = norm(a1);
  const startAngle = Math.min(angle0, angle1);
  const endAngle = Math.max(angle0, angle1);
  const isClockwise = norm(endAngle - startAngle) > P;
  ctx.arc(x, y, r, startAngle, endAngle, isClockwise);
}

export function isBetween(angle: number, start: number, end: number): boolean {
  if (norm(start) === norm(end)) return true;
  const a = norm(angle - start);
  const e = norm(end - start);
  return a < e;
}

export type LinkDrawContext = {
  cells: Record<string, unknown>;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  link: [string, string];
  pathColor: string;
  pathSize: number;
  wallSize: number;
};

export function makeDrawLink(
  getCoords: (args: { cell: { col: number; row: number }; cellSize: number; wallSize: number }) => [number, number]
): (args: LinkDrawContext & { circle: (a: { x: number; y: number; r: number }) => void }) => void {
  return ({ cells, cellSize, ctx, circle, link, pathColor, pathSize, wallSize }) => {
    const startCell = cells[link[0]] as { col: number; row: number };
    const endCell = cells[link[1]] as { col: number; row: number };
    const start = getCoords({ cell: startCell, cellSize, wallSize });
    const end = getCoords({ cell: endCell, cellSize, wallSize });
    ctx.strokeStyle = pathColor;
    ctx.fillStyle = pathColor;
    circle({ x: start[0], y: start[1], r: pathSize / 2 });
    ctx.fill();
    circle({ x: end[0], y: end[1], r: pathSize / 2 });
    ctx.fill();
    ctx.lineWidth = pathSize;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.closePath();
    ctx.stroke();
  };
}
