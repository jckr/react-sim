import React, { useRef, useEffect } from 'react';
import { withFrame } from './';

export const CanvasFrameComponent = (props) => {
  const canvasRef = useRef(null);
  const { params } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (props.draw) {
      props.draw({canvas, ctx, roundRectangle, circle, ...props});
    }
  });

  const roundRectangle = ({ x, y, width, height, r = 1, tl, tr, br, bl }) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const topLeft = tl || r;
    const topRight = tr || r;
    const bottomLeft = bl || r;
    const bottomRight = br || r;

    ctx.beginPath();
    ctx.moveTo(x + topLeft, y);
    ctx.lineTo(x + width - topRight, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
    ctx.lineTo(x + width, y + height - bottomRight);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - bottomRight,
      y + height
    );
    ctx.lineTo(x + bottomLeft, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
    ctx.lineTo(x, y + topLeft);
    ctx.quadraticCurveTo(x, y, x + topLeft, y);
    ctx.closePath();
  };

  const circle = ({ x, y, r }) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
  };

  return <canvas width={params.width} height={params.height} ref={canvasRef} />;
};

const CanvasFrame = withFrame(CanvasFrameComponent);

export default CanvasFrame;
