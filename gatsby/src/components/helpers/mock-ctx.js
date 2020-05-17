import { roundRectangleWithCtx, circleWithCtx } from 'react-sim';

const ctx = {
  fillStyle: null,
  lineCap: null,
  strokeStyle: null,
  beginPath: jest.fn(),
  closePath: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
};

const methods = [
  { name: 'arc', min: 5, max: 6 },
  { name: 'fillRect', min: 4, max: 4 },
  { name: 'lineTo', min: 2, max: 2 },
  { name: 'moveTo', min: 2, max: 2 },
  { name: 'quadraticCurveTo', min: 4, max: 4 },
  { name: 'strokeRect', min: 4, max: 4 },
];

methods.forEach(({ name, min, max }) => {
  ctx[`_${name}`] = jest.fn();
  ctx[name] = function () {
    const nbArgs = arguments.length;
    if (nbArgs < min) {
      throw `not enough arguments for ${name}`;
    }
    if (nbArgs > max) {
      throw `too many arguments for ${name}`;
    }
    return ctx[`_${name}`](...arguments);
  };
});

export const circle = args => circleWithCtx(args, ctx);
export const roundRectangle = args => roundRectangleWithCtx(args, ctx);

export default ctx;
