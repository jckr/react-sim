import React, { useRef, useEffect } from 'react';
import {
  Model as RawModel,
  withControls,
  withFrame,
  Range,
  Toggle,
  Timer,
} from 'react-sim';
import { Flex } from 'rebass';

const Model = props => (
  <Flex sx={{ border: '1px solid #000', p: 2, width: 'fit-content' }}>
    <RawModel {...props} />
  </Flex>
);

const updateAttractors = ({ angleOffset, nbAttractors, height, width }) => {
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

function init({ angleOffset, nbAttractors, height, width }) {
  const attractors = updateAttractors({
    angleOffset,
    nbAttractors,
    height,
    width,
  });
  const o = {
    x: Math.random() * width,
    y: Math.random() * height,
  };
  const background = `hsla(${Math.floor(Math.random() * 360)}, 30%, 7%, 1)`;
  const color = `hsla(${Math.floor(Math.random() * 360)}, 77%, 45%, 1)`;
  return {
    attractors,
    background,
    color,
    points: [o],
    prevDirection: 0,
  };
}

function updateData({ data, params, tick }) {
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
    (data.prevDirection + rules[Math.floor(Math.random() * rules.length)]) %
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

const Frame = ({ data, tick, params }) => {
  const canvasRef = useRef(null);
  const { height, width } = params;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.fillStyle = data.background;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = data.color;

    for (let i = 0; i < tick; i++) {
      ctx.globalAlpha = 0.8;
      const point = data.points[i];
      ctx.beginPath();
      ctx.arc(point.x, point.y, params.r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  return <canvas height={height} width={width} ref={canvasRef} />;
};

export const BasicChaosGame = () => (
  <Model
    ticksPerAnimation={100}
    maxTime={10000}
    initData={init}
    updateData={updateData}
    initialParams={{
      height: 500,
      width: 500,
      nbAttractors: 3,
      angleOffset: 0,
      r: 1,
    }}
  >
    <Frame />
  </Model>
);

const CustomControls = ({ params, setParams }) => {
  const toggles = [...Array(params.nbAttractors).keys()].map(a => (
    <Toggle
      key={`toggle-${a}`}
      checked={params.rules.charAt(a) === '1'}
      label={`${a + 1}${a === 0 ? 'st' : a === 1 ? 'nd' : 'th'} vertex`}
      setValue={checked => {
        const bit = params.rules.charAt(a) === '1' ? '0' : '1';
        const updatedRules =
          params.rules.slice(0, a) + bit + params.rules.slice(a + 1);
        setParams({ rules: updatedRules });
      }}
    />
  ));

  return (
    <Flex flexDirection="column">
      <Range
        key="range"
        minValue={3}
        maxValue={12}
        label="Vertices"
        value={params.nbAttractors}
        setValue={v =>
          setParams({ nbAttractors: v, rules: '1'.repeat(v) }, true)
        }
      />
      <Flex flexDirection="row">{toggles}</Flex>
    </Flex>
  );
};

const Controls = withControls(CustomControls);
const HOCFrame = withFrame(Frame);
export const ChaosGame = () => (
  <Model
    ticksPerAnimation={100}
    maxTime={10000}
    initData={init}
    updateData={updateData}
    initialParams={{
      height: 500,
      width: 500,
      nbAttractors: 3,
      angleOffset: 0,
      r: 1,
      rules: '111',
    }}
  >
    <Flex flexDirection="column">
      <HOCFrame />
      <Controls />
    </Flex>
  </Model>
);
