import React from 'react';
import renderer from 'react-test-renderer';
import { Frame } from '../simple-model';

describe('Simple Model', () => {
  it('model renders properly', () => {
    const tree = renderer.create(<Frame tick={10} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
