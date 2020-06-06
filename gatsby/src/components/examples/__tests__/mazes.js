import React from 'react';
import renderer from 'react-test-renderer';
import { grids, initData, updateData, draw, Frame, params } from '../mazes';
import ctx from '../../helpers/mock-ctx';
import Random from '../../helpers/random';

import {
  P,
  P2,
  getColRow,
  norm,
  average,
  getRadius,
  isBetween,
  acuteArc,
} from '../mazes/helpers';

describe('mazes', () => {
  grids.forEach(grid => {
    let data;
    it('data function works', () => {
      const rng = new Random();
      data = initData({ ...params, grid }, rng.get);
      expect(data).toMatchSnapshot();
      const complete = jest.fn();
      for (let tick = 1; tick < 5; tick++) {
        data = updateData(
          { data, tick, params: { ...params, grid }, complete },
          rng.get
        );
        expect(data).toMatchSnapshot();
      }
    });
    it('model renders properly', () => {
      const frame = renderer
        .create(
          <Frame data={data} tick={5} ctx={ctx} params={{ ...params, grid }} />
        )
        .toJSON();
      expect(frame).toMatchSnapshot();
    });
  });
  it('helpers work', () => {
    expect(getColRow(5, 10).col).toBe(5);
    expect(getColRow(5, 10).row).toBe(0);
    expect(getColRow(15, 10).col).toBe(5);
    expect(getColRow(15, 10).row).toBe(1);

    expect(norm(1)).toBe(1);
    expect(norm(-1)).toBe(P2 - 1);
    expect(norm(P2 + 1)).toBe(1);

    expect(average(0, 1)).toBe(0.5);
    expect(average(1, 0)).toBe(0.5);
    expect(average(0, 4)).toBe(2 + P);

    expect(getRadius(1, 10)).toBe(15);

    const arc = acuteArc({ ctx, x: 50, y: 50, r: 10, a0: 0, a1: 1 });
    expect(true).toBeTruthy();

    expect(isBetween(1, 0, 2)).toBeTruthy();
    expect(isBetween(1, 2, 3)).toBeFalsy();
    expect(isBetween(2, 1, 5)).toBeTruthy();
  });
});
