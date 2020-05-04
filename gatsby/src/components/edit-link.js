import React from 'react';
import { Location } from '@reach/router';
import { Link } from 'rebass';

const base =
  'https://github.com/jckr/react-sim/edit/master/gatsby/src/pages';

const getHREF = location => {
  if (location.pathname === '/') return false;
  return base + location.pathname.replace(/\/+$/, '') + '.mdx';
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
