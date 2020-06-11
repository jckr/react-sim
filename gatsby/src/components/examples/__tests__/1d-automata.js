import React from 'react';
import renderer from 'react-test-renderer';
import Automata, { initData, updateData, params } from '../automata';
import Random from '../../helpers/random';

describe('1d automata', () => {
  let data;
  it('init data function works', () => {
    const rng = new Random();
    data = initData(params, rng.get);
    expect(data).toMatchSnapshot();
  });
  it('update function', () => {
    const rule = 110;
    const cases = [
      { input: [1, 1, 1], output: 0 },
      { input: [1, 1, 0], output: 1 },
      { input: [1, 0, 1], output: 1 },
      { input: [1, 0, 0], output: 0 },
      { input: [0, 1, 1], output: 1 },
      { input: [0, 1, 0], output: 1 },
      { input: [0, 0, 1], output: 1 },
      { input: [0, 0, 0], output: 0 },
    ];
    cases.forEach(c => {
      const updatedData = updateData({ data: c.input, params: { rule } });
      if (c.output) {
        expect(updatedData[1]).toBeTruthy();
      } else {
        expect(updatedData[1]).toBeFalsy();
      }
    });
  });
  it('model renders properly', () => {
    const tree = renderer
      .create(<Automata data={data} params={params} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
