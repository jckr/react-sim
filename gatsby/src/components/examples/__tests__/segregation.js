import React from 'react';
import renderer from 'react-test-renderer';
import {
  initData,
  updateData,
  draw,
  Frame,
  params,
  countNeighbors,
  getPotentialNeighbors,
  isHappy
} from '../segregation';
import ctx from '../../helpers/mock-ctx';
import Random from '../../helpers/random';

const grid = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
].map(row => row.map(cell => ({ community: cell })));

describe('Segregation', () => {
  let data;
  it('countNeighbors functions', () => {
    expect(countNeighbors(grid, 1, 1)).toBe(0);
    expect(countNeighbors(grid, 4, 3)).toBe(5);
    expect(countNeighbors(grid, 1, 3)).toBe(8);
  });
  it('getPotentialNeighbors works', () => {
    expect(getPotentialNeighbors(grid, 1, 1)).toBe(8);
    expect(getPotentialNeighbors(grid, 4, 3)).toBe(5);
    expect(getPotentialNeighbors(grid, 4, 4)).toBe(3);
  })
  it('isHappy works', () => {
    expect(isHappy(grid, 1, 1, 50)).toBe(false);
    expect(isHappy(grid, 4, 3, 50)).toBe(true);
    expect(isHappy(grid, 4, 4, 1)).toBe(true);
  })

  it('data function works', () => {
    const rng = new Random();
    data = initData(params, rng.get);
    expect(data).toMatchSnapshot();
    const complete = jest.fn();
    for (let tick = 1; tick < 5; tick++) {
      data = updateData({ data, tick, params, complete }, rng.get);
      expect(data).toMatchSnapshot();
    }
  }),
    it('model renders properly', () => {
      const frame = renderer
        .create(<Frame data={data} tick={5} ctx={ctx} params={params} />)
        .toJSON();
      expect(frame).toMatchSnapshot();
    });
});
