import React from 'react';
import {
  CanvasFrame,
  TimeSeries,
  Counter,
  withFrame,
} from 'react-sim';
import { Flex, Text } from 'rebass';

import { FitContentModel as Model } from './framed-model';

import { initDice, updateDice, Die } from './dice';

const initDataCF = ({ height, width, balls, speed }) =>
  Array(balls)
    .fill(0)
    .map(d => ({
      x: Math.random() * width,
      y: Math.random() * height,
      c: `hsl(${Math.floor(Math.random() * 360)},85%,57%)`,

      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    }));

const updateDataGF = ({ data, params }) =>
  data.map(({ x, y, ...ball }) => ({
    x: (x + ball.vx) % params.width,
    y: (y + ball.vy) % params.height,
    ...ball,
  }));

const draw = ({ ctx, cachedData, data, circle, params, tick }) => {
  const { height, width } = params;
  ctx.clearRect(0, 0, width, height);

  for (let i = Math.max(tick - 10, 0); i < tick; i++) {
    const age = tick - i;
    ctx.globalAlpha = 0.1 + (10 - age) * 0.05;
    const r = 0.3 * (10 - age);
    cachedData[i].forEach(d => {
      ctx.fillStyle = d.c;
      circle({ x: d.x, y: d.y, r });
      ctx.fill();
    });
  }
  ctx.globalAlpha = 1;
  data.forEach(d => {
    ctx.fillStyle = d.c;
    circle({ x: d.x, y: d.y, r: 3 });
    ctx.fill();
  });
};

export const CanvasFrameExample = () => (
  <Model
    initData={initDataCF}
    updateData={updateDataGF}
    maxTime={500}
    initialParams={{
      height: 200,
      width: 500,
      balls: 200,
      speed: 3,
    }}
  >
    <CanvasFrame draw={draw} />
  </Model>
);

const DieFrame = ({ data }) => {
  return (
    <Flex flexDirection="row" sx={{ height: '30px' }}>
      {data.rolls.map((value, index) => (
        <Die value={value} key={`k-${index}`} />
      ))}
    </Flex>
  );
};

const HOCDieFrame = withFrame(DieFrame);

const average = {
  color: '#33e',
  label: 'Average',
  accessor: d => Number(d.average.toFixed(2)),
};

const series = [
  average,
  {
    color: '#e3e',
    label: 'Last roll',
    accessor: d => d.total,
  },
];

const stackedSeries = [...Array(13).keys()].slice(2).map(dots => ({
  color: `hsl(${(360 * (1 + dots - 2)) / 11},85%,57%)`,
  label: String(dots),
  accessor: d => d.totals[dots] || 0,
}));

export const TimeSeriesExample = () => (
  <Model
    initData={initDice}
    updateData={updateDice}
    initialParams={{ nbDice: 2 }}
  >
    <Flex flexDirection="column">
      <Text sx={{ fontSize: 1, fontWeight: 'bold' }}>Roll:</Text>
      <HOCDieFrame />
      <Text sx={{ fontSize: 1, fontWeight: 'bold' }}>Average rolls:</Text>
      <TimeSeries series={series} />
      <Counter series={series} />
      <Text sx={{ fontSize: 1, fontWeight: 'bold' }}>Roll distribution:</Text>
      <TimeSeries series={stackedSeries} stacked />
      <Counter series={stackedSeries.slice(0, 6)} />
      <Counter series={stackedSeries.slice(6)} />
    </Flex>
  </Model>
);
