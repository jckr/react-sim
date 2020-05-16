import React from 'react';
import renderer from 'react-test-renderer';
import { ActivatorFrame, initData, update } from '../activators';
import Random from '../../helpers/random';

describe('Activators', () => {
  const params = {
    height: 30,
    width: 30,
    density: 0.5,
    innerRadius: 3,
    outerRadius: 6,
    w: 0.35,
  };
  let data;
  it('data function works', () => {
    const rng = new Random();
    data = initData(params, rng.get);
    expect(data).toMatchSnapshot();
    const complete = jest.fn();
    for (let tick = 1; tick < 5; tick++) {
      data = update({ data, tick, params, complete });
      expect(data).toMatchSnapshot();
    }
  });
  it('model renders properly', () => {
    const tree = renderer.create(<ActivatorFrame data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
