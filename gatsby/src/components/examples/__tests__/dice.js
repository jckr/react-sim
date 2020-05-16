import React from 'react';
import renderer from 'react-test-renderer';
import { Die, DiceFrame, initDice, updateDice } from '../dice';
import Random from '../../helpers/random';

describe('Dice', () => {
  const params = {
    nbDice: 5,
  };
  let data;
  it('data function works', () => {
    const rng = new Random();
    data = initDice(params, rng.get);
    expect(data).toMatchSnapshot();
    const complete = jest.fn();
    for (let tick = 1; tick < 5; tick++) {
      data = updateDice({ data, tick, params, complete }, rng.get);
      expect(data).toMatchSnapshot();
    }
  });
  it('model renders properly', () => {
    for (let dots = 1; dots < 6; dots++) {
      expect(renderer.create(<Die value={dots} />).toJSON()).toMatchSnapshot();
    }
    const tree = renderer
      .create(
        <DiceFrame
          data={data}
          tick={5}
          params={params}
          theme={{ colors: { primary: 'red' } }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
