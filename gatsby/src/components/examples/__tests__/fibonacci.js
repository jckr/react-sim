import React from 'react';
import renderer from 'react-test-renderer';
import {
  initData,
  updateData,
  draw,
  FibonacciSquaresFrame,
} from '../fibonacci';
import ctx from '../../helpers/mock-ctx';

describe('Fibonacci', () => {
  const params = { size: 500 };
  let data;
  it('data function works', () => {
    data = initData(params);
    expect(data).toMatchSnapshot();
    for (let tick = 1; tick < 10; tick++) {
      data = updateData({ data, tick, params });
      expect(data).toMatchSnapshot();
    }
  });
  it('model renders properly', () => {
    expect(draw({ ctx, params, tick: 5 })).toMatchSnapshot();
    const squares = renderer
      .create(<FibonacciSquaresFrame data={data} tick={5} params={params} />)
      .toJSON();
    expect(squares).toMatchSnapshot();
  });
});
