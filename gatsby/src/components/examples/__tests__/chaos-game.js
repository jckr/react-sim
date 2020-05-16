import React from 'react';
import renderer from 'react-test-renderer';
import {
  Frame,
  CustomControls,
  init,
  updateData,
  updateAttractors,
} from '../chaos-game';
import Random from '../../helpers/random';

describe('chaos-game', () => {
  const params = {
    height: 500,
    width: 500,
    nbAttractors: 7,
    angle: 0,
    r: 1,
    rules: '1001100',
  };
  let data;
  it('data function works', () => {
    const rng = new Random();
    data = init(params, rng.get);
    expect(data).toMatchSnapshot();
    for (let tick = 1; tick < 5; tick++) {
      data = updateData({ data, tick, params }, rng.get);
      expect(data).toMatchSnapshot();
    }
  });
  it('model renders properly', () => {
    const controls = renderer
      .create(<CustomControls params={params} setParams={jest.fn()} />)
      .toJSON();
    expect(controls).toMatchSnapshot();
    const tree = renderer
      .create(<Frame data={data} params={params} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
