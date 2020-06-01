export const HALF_SQRT3 = Math.sqrt(3) / 2;
export const P = Math.PI;
export const P2 = Math.PI * 2;
export const getColRow = (id, cols) => {
  const col = id % cols;
  const row = (id - col) / cols;
  return { col, row };
};

export const norm = (a) => (a + P2) % P2;

export const average = (a0, a1) => {
  let min = Math.min(norm(a0), norm(a1));
  let max = Math.max(norm(a0), norm(a1));

  if (max - min > P) {
    return norm(min + (max - min) / 2 + P);
  }
  return norm(min + (max - min) / 2);

};

export const getRadius = (layer, cellSize) => {
  return (layer + 0.5) * cellSize;
}

export const isBetween = (angle, start, end) => {
  if (norm(start) === norm(end)) {
    return true;
  }
  let a = norm(angle - start);
  let e = norm(end - start);
  return a < e;
};

export const drawLink = getCoords => ({
  cells,
  cellSize,
  ctx,
  circle,
  link,
  pathColor,
  pathSize,
  wallSize,
}) => {
  const startCell = cells[link[0]];
  const endCell = cells[link[1]];

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
  ctx.moveTo(...start);
  ctx.lineTo(...end);
  ctx.closePath();
  ctx.stroke();
};
