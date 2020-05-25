import React from 'react';
import { CanvasFrame } from 'react-sim';

import Model from './framed-model';

const phi = 0.5 + Math.sqrt(5) / 2;

const D = {
  0: 'right',
  1: 'down',
  2: 'left',
  3: 'up',
};

const colors = {
  right: '#b6b6e2',
  down: '#a6d3d9',
  left: '#ffeb3b',
  up: '#95d392',
};

export function initData() {
  return [0];
}

export function updateData({ data, tick }) {
  if (tick === 0) {
    return [0];
  }
  if (tick === 1) {
    return [0, 1];
  }
  const lastNumber = data[tick - 1] + data[tick - 2];
  return [...data, lastNumber];
}

export function draw({ ctx, params: { size }, tick }) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  let x = 0,
    y = 0,
    side = size;
  for (let i = 0; i < tick; i++) {
    const d = D[i % 4];
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
    }
  }
}

export const FibonacciSpiralFrame = ({ tick, params }) => {
  const { size } = params;
  const width = size;
  const height = size / phi;

  return <CanvasFrame height={height} width={width} draw={draw} />;
};

const FibonacciSpiral = () => (
  <Model initialParams={{ size: 332 }} delay={100} maxTime={15}>
    <FibonacciSpiralFrame />
  </Model>
);

export const FibonacciSquaresFrame = ({ data, tick, params }) => {
  let maxX = 0,
    minX = 0,
    maxY = 0,
    minY = 0,
    x = 0,
    y = 0;
  function renderSquares(sequence) {
    return sequence.map((d, i) => {
      const n = d * 10;
      const direction = D[i % 4];
      switch (direction) {
        case 'right':
          y = y - n;
          break;
        case 'left':
          x = x - n;
          break;
        case 'up':
          x = x - n;
          y = y - n;
          break;
        default:
      }
      const borderWidth = Math.max(
        0.1,
        i < 2 ? 1 / params.size : 1 / (n + 10 * sequence[i - 1])
      );

      const fontSize = n / (1.5 * String(d).length);

      const square = (
        <div
          key={`rect-${i}`}
          style={{
            position: 'absolute',
            border: `#{borderWidth}px solid #777`,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colors[direction],
            top: y,
            left: x,
            width: n,
            height: n,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize,
            }}
          >
            {d}
          </div>
          <div
            style={{
              position: 'absolute',
              width: 2 * n,
              height: 2 * n,
              border: `${borderWidth}px solid black`,
              borderRadius: n,
              boxSizing: 'border-box',
              top: 0,
              left: 0,
              transform: {
                right: undefined,
                down: 'translate(-50%)',
                left: 'translate(-50%,-50%)',
                up: 'translate(0,-50%)',
              }[direction],
            }}
          />
        </div>
      );
      switch (direction) {
        case 'right':
          x = x + n;
          break;
        case 'down':
          x = x + n;
          y = y + n;
          break;
        case 'left':
          y = y + n;
          break;
        default:
      }
      maxX = Math.max(maxX, x);
      minX = Math.min(minX, x);
      maxY = Math.max(maxY, y);
      minY = Math.min(minY, y);
      return square;
    });
  }

  const squares = renderSquares(data.slice(1));
  const maxSide = Math.max(maxX - minX, maxY - minY);
  const scale = params.size / maxSide;

  return (
    <div
      style={{
        width: params.size,
        height: params.size,
        position: 'relative',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          transformOrigin: 'top left',
          transform: `scale(${scale}) translate(${-minX}px,${-minY}px)`,
          width: `${maxX - minX}px`,
          height: `${maxY - minY}px`,
          transition: 'transform 0.2s',
        }}
      >
        {squares}
      </div>
    </div>
  );
};

const FibonacciSquares = () => (
  <Model
    initialParams={{ size: 350 }}
    initData={initData}
    updateData={updateData}
    delay={400}
    maxTime={12}
  >
    <FibonacciSquaresFrame />
  </Model>
);

export { FibonacciSpiral, FibonacciSquares };
