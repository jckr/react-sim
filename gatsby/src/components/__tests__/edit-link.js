import React from 'react';
import renderer from 'react-test-renderer';
import EditLink from '../edit-link';
describe('EditLink', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditLink />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
