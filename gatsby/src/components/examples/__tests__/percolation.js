import React from 'react';
import renderer from 'react-test-renderer';
import {
  initData,
  initDataGrid,
  updateData,
  updateDataGrid,
  draw,
} from '../percolation';
import { CanvasFrame } from 'react-sim';
import ctx from '../../helpers/mock-ctx';
import Random from '../../helpers/random';

describe('percolation', () => {
  const params = {
    width: 100,
    height: 100,
    cellSize: 5,
    margin: 0,
    porosity: 0.6,
    shouldComplete: true,
  };
  let data;
  const rng = new Random();
  const complete = jest.fn();
  it('data function works', () => {
    data = initData(params, rng.get);
    expect(data).toMatchSnapshot();
    for (let tick = 1; tick < 5; tick++) {
      data = updateData({ data, tick, params, complete });
      expect(data).toMatchSnapshot();
    }
  });
  it('model renders properly', () => {
    const squares = renderer
      .create(
        <CanvasFrame
          data={data}
          tick={5}
          ctx={ctx}
          params={params}
          width={params.width * params.cellSize}
          height={params.height * params.cellSize}
        />
      )
      .toJSON();
    expect(squares).toMatchSnapshot();
  });
});

describe('percolation grid', () => {
  const params = {
    width: 20,
    height: 20,
    cellSize: 1.5,
    margin: 0,
    rows: 10,
    cols: 10,
    minP: 0.5,
    stepP: 0.02,
  };
  let data;
  const rng = new Random();
  const complete = jest.fn();
  it('data function works', () => {
    data = initDataGrid(params, rng);
    expect(data).toMatchSnapshot();
    for (let tick = 1; tick < 5; tick++) {
      data = updateDataGrid({ data, tick, params, complete });
      expect(data).toMatchSnapshot();
    }
  });
});
