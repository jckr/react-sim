import React from 'react';
import { Location } from '@reach/router';
import { Link } from 'rebass';

const base =
  'https://github.com/jckr/react-sim/blob/main/gatsby/src/components/examples/';

const getHREF = location => {
  const examplePath = (location.pathname || '').match(/\/examples\/([^/]+)/);
  const example = examplePath ? examplePath[1] : null;
  if (example === null) return false;
  return base + example + '.js';
};

export default props => (
  <Location
    children={({ location }) => {
      const href = getHREF(location);
      if (!href) return false;

      return (
        <Link
          {...props}
          href={href}
          sx={{
            display: 'inline-block',
            color: 'inherit',
            fontSize: 1,
          }}
        />
      );
    }}
  />
);
