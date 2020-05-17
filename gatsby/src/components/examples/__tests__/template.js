import React from 'react';
import renderer from 'react-test-renderer';
import { initData, updateData, draw, Frame, params } from '../template';
import ctx from '../../helpers/mock-ctx';
import Random from '../../helpers/random';

describe('template', () => {
  let data;
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
        .create(
          <Frame data={data} tick={5} ctx={ctx} params={params} />
        )
        .toJSON();
      expect(frame).toMatchSnapshot();
    });
});
