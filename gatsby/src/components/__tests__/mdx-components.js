import React from 'react';
import renderer from 'react-test-renderer';
import { pre, code } from '../mdx-components';
describe('MDX components', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <pre>
          <code className="jsx">
            {`const MyModel = () =>
          <Model />`}
          </code>
        </pre>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
