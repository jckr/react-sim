import React from 'react';
import {
  withControls,
  Range,
  Toggle,
  CanvasFrame,
} from 'react-sim';
import { Flex } from 'rebass';

import Model from './framed-model';

export const updateAttractors = ({ angleOffset, nbAttractors, height, width }) => {
  const center = { x: width / 2, y: height / 2 };
  const radius = (0.95 * Math.min(height, width)) / 2;
  return [...Array(nbAttractors).keys()].map(i => {
    const angle = angleOffset + (0.5 * (nbAttractors + 4 * i)) / nbAttractors;
    return {
      x: center.x + radius * Math.cos(angle * Math.PI),
      y: center.y - radius * Math.sin(angle * Math.PI),
    };
  });
};

export function init({ angle, nbAttractors, height, width }, random = Math.random) {
  const angleOffset = angle === undefined ? random() * 2 * Math.PI : angle;
  const attractors = updateAttractors({
    angleOffset,
    nbAttractors,
    height,
    width,
  });
  const o = {
    x: random() * width,
    y: random() * height,
  };
  const background = `hsla(${Math.floor(random() * 360)}, 30%, 7%, 1)`;
  const color = `hsla(${Math.floor(random() * 360)}, 77%, 45%, 1)`;
  return {
    attractors,
    background,
    color,
    points: [o],
    prevDirection: 0,
  };
}

export function updateData({ data, params, tick }, random = Math.random) {
  const { nbAttractors } = params;
  if (data.attractors.length !== nbAttractors) {
    data.attractors = updateAttractors(params);
  }
  const rules = params.rules
    ? params.rules.split('').reduce((prev, curr, i) => {
        if (curr === '1') {
          prev.push(i);
        }
        return prev;
      }, [])
    : [...Array(nbAttractors).keys()];
  const direction =
    (data.prevDirection + rules[Math.floor(random() * rules.length)]) %
    nbAttractors;
  data.prevDirection = direction;
  const lastPoint = data.points[data.points.length - 1];
  const attractor = data.attractors[direction];
  const newPoint = {
    x: (lastPoint.x + attractor.x) / 2,
    y: (lastPoint.y + attractor.y) / 2,
  };
  data.points.push(newPoint);
  return data;
}

export const Frame = props => <CanvasFrame draw={draw} {...props} />;

function draw({ ctx, data, params, tick, circle }) {
  const { height, width } = params;
  ctx.globalAlpha = 1;
  ctx.fillStyle = data.background;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = data.color;
  ctx.globalAlpha = 0.8;

  for (let i = 0; i < tick; i++) {
    const point = data.points[i];
    const { x, y } = point;
    const { r } = params;
    circle({ x, y, r });
    ctx.fill();
  }
}

export const BasicChaosGame = props => (
  <Model
    ticksPerAnimation={100}
    maxTime={10000}
    initData={init}
    isPlaying
    loop
    updateData={updateData}
    initialParams={{
      height: 332,
      width: 332,
      nbAttractors: 3,
      r: 1,
    }}
    {...props}
  >
    <Frame />
  </Model>
);

export const CustomControls = ({ params, setParams }) => {
  const nbToggles = params.nbAttractors;
  const nbRows = Math.ceil(nbToggles / 5);
  const toggle = a =>
    a < nbToggles ? (
      <Toggle
        key={`toggle-${a}`}
        sx={{ flex: '1 1 0' }}
        checked={params.rules.charAt(a) === '1'}
        label={`${a + 1}${a === 0 ? 'st' : a === 1 ? 'nd' : 'th'} vertex`}
        setValue={checked => {
          const bit = params.rules.charAt(a) === '1' ? '0' : '1';
          const updatedRules =
            params.rules.slice(0, a) + bit + params.rules.slice(a + 1);
          setParams({ rules: updatedRules });
        }}
      />
    ) : null;

  const toggles = [...Array(nbRows).keys()].map(r => (
    <Flex
      flexDirection="row"
      key={`tr-${r}`}
      sx={{ justifyContent: 'space-between' }}
    >
      {[r * 5, r * 5 + 1, r * 5 + 2, r * 5 + 3, r * 5 + 4].map(toggle)}
    </Flex>
  ));

  return (
    <Flex flexDirection="column">
      <Range
        key="range"
        minValue={3}
        maxValue={20}
        label="Vertices"
        value={params.nbAttractors}
        setValue={v =>
          setParams({ nbAttractors: v, rules: '1'.repeat(v) }, true)
        }
      />
      <Flex flexDirection="column">{toggles}</Flex>
    </Flex>
  );
};

const Controls = withControls(CustomControls);
export const ChaosGame = props => (
  <Model
    ticksPerAnimation={100}
    maxTime={20000}
    initData={init}
    updateData={updateData}
    initialParams={{
      height: 332,
      width: 332,
      nbAttractors: 7,
      angle: 0,
      r: 1,
      rules: '1001100',
    }}
    {...props}
  >
    <Flex flexDirection="column">
      <Frame />
      <Controls />
    </Flex>
  </Model>
);
export default ChaosGame;
