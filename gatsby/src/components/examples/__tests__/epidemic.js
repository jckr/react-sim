import React from 'react';
import renderer from 'react-test-renderer';
import { EpidemicFrame, initData, updateEpidemic } from '../epidemic';
import Random from '../../helpers/random';

describe('Epidemic', () => {
  const params = {
    nbAgents: 500,
    nbSick: 20,
    contaminationRisk: 1,
    deathRisk: 0.001,
    maxSpeed: 2,
    recoveryTicks: 200,
    nbDistancing: 0,
    r: 3,
    height: 300,
    width: 500,
  };
  let data;
  it('data function works', () => {
    const rng = new Random();
    data = initData(params, rng.get);
    expect(data).toMatchSnapshot();
    const complete = jest.fn();
    for (let tick = 1; tick < 5; tick++) {
      data = updateEpidemic({ data, tick, params, complete }, rng.get);
      expect(data).toMatchSnapshot();
    }
  });
  it('model renders properly', () => {
    const tree = renderer
      .create(
        <EpidemicFrame
          data={data}
          tick={5}
          params={params}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
