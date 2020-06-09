import React from 'react';
import { Grid } from 'react-sim';

import Model from './framed-model';

export const Frame = ({ tick }) => {
  const data = Array(10)
    .fill(0)
    .map((r, y) =>
      Array(10)
        .fill(0)
        .map((c, x) => (10 * y + x > tick ? 0 : 1))
    );
  return <Grid data={data} size={36} />;
};

const SimpleModel = props => (
  <Model {...props}>
    <Frame />
  </Model>
);

export default SimpleModel;
