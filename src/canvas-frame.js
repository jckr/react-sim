import React, { useRef, useEffect } from 'react';
import { withFrame } from './';

const roundRectangleWithCtx = (
  { x, y, width, height, r = 1, tl, tr, br, bl },
  ctx
) => {
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

const circleWithCtx = ({ x, y, r }, ctx) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
};

export const CanvasFrameComponent = (props) => {
  const canvasRef = useRef(null);
  const { params = {} } = props;

  const width = props.width === undefined ? params.width : props.width;
  const height = props.height === undefined ? params.height : props.height;

  useEffect(() => {
    const canvas = props.canvas || canvasRef.current;
    const ctx = props.ctx || canvas.getContext('2d');

    const circle = (circleArgs) => circleWithCtx(circleArgs, ctx);
    const roundRectangle = (roundRectangleArgs) =>
      roundRectangleWithCtx(roundRectangleArgs, ctx);

    if (props.draw) {
      props.draw({ canvas, ctx, roundRectangle, circle, ...props });
    }
  });

  return <canvas width={width} height={height} ref={canvasRef} />;
};

const CanvasFrame = withFrame(CanvasFrameComponent);

export default CanvasFrame;
