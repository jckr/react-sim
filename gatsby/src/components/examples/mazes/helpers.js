export const HALF_SQRT3 = Math.sqrt(3) / 2;
export const P = Math.PI;
export const P2 = Math.PI * 2;
export const getColRow = (id, cols) => {
  const col = id % cols;
  const row = (id - col) / cols;
  return { col, row };
};
export const isBetween = (angle, start, end) => {
  if ((start + P2) % P2 === (end + P2) % P2) {
    return true;
  }
  let a = (P2 + angle - start) % P2;
  let e = (P2 + end - start) % P2;
  return a < e;
};
