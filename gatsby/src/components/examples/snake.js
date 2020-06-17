import React from 'react';
import Model from './framed-model';
import SnakeFrame from './snake/canvas';
import {
  initSnakeGame,
  initSnakeGrid,
  updateSnake,
  updateSnakeGrid,
} from './snake/data';

// update

const Snake = props => (
  <Model
    auto={false}
    maxTime={Infinity}
    noCache
    controls={[
      {
        type: 'radio',
        label: 'speed',
        options: ['normal', 'fast', 'very fast'],
        param: 'speed',
        setParams: value =>
          ({
            normal: { delay: 100, ticksPerAnimation: 1, speed: 'normal' },
            fast: { delay: 0, ticksPerAnimation: 1, speed: 'fast' },
            'very fast': {
              delay: 0,
              ticksPerAnimation: 20,
              speed: 'very fast',
            },
          }[value]),
      },
      [
        {
          type: 'toggle',
          label: 'Display grid',
          param: 'displayGrid',
        },
        {
          type: 'toggle',
          label: 'Display circuit',
          param: 'displayCircuit',
        },
      ],
    ]}
    initData={initSnakeGame}
    initialParams={{
      cellSize: 16,
      delay: 100,
      displayCircuit: true,
      displayGrid: false,
      fruitGrowth: 4,
      height: 20,
      width: 20,
      initialLength: 2,
      safeMode: false,
      speed: 'normal',
      snakePosRandom: true,
      directionRandom: true,
      ...props.extraParams,
    }}
    updateData={updateSnake}
    {...props}
  >
    <SnakeFrame />
  </Model>
);

export default Snake;

export const SnakeGrid = props => (
  <Model
    auto={false}
    maxTime={Infinity}
    initData={initSnakeGrid}
    initialParams={{
      cellSize: 16,
      displayCircuit: true,
      displayGrid: true,
      fruitGrowth: 4,
      height: 20,
      width: 20,
      initialLength: 2,
      snakePosRandom: true,
      directionRandom: true,
    }}
    updateData={updateSnakeGrid}
    {...props}
  >
    <SnakeFrame />
  </Model>
);

export const SnakeGridDebugger = () => (
  <Model
    auto={false}
    maxTime={Infinity}
    initData={initSnakeGrid}
    initialParams={{
      cellSize: 25,
      fruitGrowth: 4,
      height: 10,
      width: 10,
      initialLength: 4,
      xHead: 8,
      yHead: 2,
      directionText: 'right',
      snakePosRandom: false,
      directionRandom: false,
      ticksPerAnimation: 1000,
    }}
    controls={[
      {
        type: 'range',
        param: 'xHead',
        minValue: 2,
        maxValue: 18,
        resetOnChange: true,
      },
      {
        type: 'range',
        param: 'yHead',
        minValue: 2,
        maxValue: 18,
        resetOnChange: true,
      },
      {
        type: 'radio',
        param: 'directionText',
        options: ['up', 'right', 'down', 'left'],
        resetOnChange: true,
      },
    ]}
    updateData={updateSnakeGrid}
  >
    <SnakeFrame />
  </Model>
);
