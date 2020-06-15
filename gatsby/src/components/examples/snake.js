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
    maxTime={10000}
    initData={initSnakeGame}
    initialParams={{
      cellSize: 11,
      fruitGrowth: 4,
      height: 30,
      width: 30,
      initialLength: 2,
      safeMode: false,
      snakePosRandom: true,
      directionRandom: true,
    }}
    updateData={updateSnake}
    {...props}
  >
    <SnakeFrame />
  </Model>
);

export default Snake;

export const SnakeGrid = () => (
  <Model
    auto={false}
    maxTime={Infinity}
    initData={initSnakeGrid}
    initialParams={{
      cellSize: 16,
      fruitGrowth: 4,
      height: 20,
      width: 20,
      initialLength: 2,
      snakePosRandom: true,
      directionRandom: true,
    }}
    updateData={updateSnakeGrid}
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
