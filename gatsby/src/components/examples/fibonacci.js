import React, { useRef, useEffect } from 'react';
import { Model } from 'react-sim';
import { Flex, Box } from 'rebass';

const phi = 0.5 + Math.sqrt(5) / 2;

const D = {
  0: 'right',
  1: 'down',
  2: 'left',
  3: 'up',
};

function initData() {
  return [0];
}

function updateData({ data, tick }) {
  if (tick === 0) {
    return [0];
  }
  if (tick === 1) {
    return [0, 1];
  }
  const lastNumber = data[tick - 1] + data[tick - 2];
  return [...data, lastNumber];
}

const FibonacciFrame = ({ data, params }) => {
  const canvasRef = useRef(null);
  const { size } = params;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    let x = 0,
      y = 0,
      side = size;
    for (let i = 0; i < data.length; i++) {
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
      }
    }
  });

  return <canvas width={size} height={size / phi} ref={canvasRef} />;
};

const Fibonacci = () => (
  <Model
    initialParams={{ size: 500 }}
    delay={100}
    initData={initData}
    updateData={updateData}
    maxTime={20}
  >
    <FibonacciFrame />
  </Model>
);

export default Fibonacci;
