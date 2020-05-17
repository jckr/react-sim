import React from 'react';
import renderer from 'react-test-renderer';
import {
  initSnake,
  initSnakeGrid,
  initSnakeGame,
  updateSnake,
  updateSnakeGrid,
} from '../snake/data';
import Random from '../../helpers/random';

describe('Snake', () => {
  const params = {
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
  };
  let data;
  it('data function works - snake', () => {
    const rng = new Random();
    data = initSnake(params, rng.get);
    expect(data).toMatchSnapshot();
  });
  it('data function works - grid', () => {
    const rng = new Random();
    data = initSnakeGrid(params, rng.get);
    expect(data).toMatchSnapshot();
    const complete = jest.fn();
    for (let tick = 1; tick < 5; tick++) {
      data = updateSnakeGrid({ data, tick, params, complete }, rng.get);
      expect(data).toMatchSnapshot();
    }
  });
  it('data function works - game', () => {
    const rng = new Random();
    data = initSnakeGame(params, rng.get);
    expect(data).toMatchSnapshot();
    const complete = jest.fn();
    for (let tick = 1; tick < 5; tick++) {
      data = updateSnake({ data, tick, params, complete }, rng.get);
      expect(data).toMatchSnapshot();
    }
  });
});
