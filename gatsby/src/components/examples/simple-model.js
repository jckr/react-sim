import React from "react";
import {Model as RawModel, Grid} from 'react-sim';
import {Flex} from 'rebass';

const Model = props => (
  <Flex sx={{ border: '1px solid #000', p: 2, width: 'fit-content' }}>
    <RawModel {...props} />
  </Flex>
);

const Frame = ({tick}) => {
  const data = Array(10).fill(0).map((r, y) =>
    Array(10).fill(0).map((c, x) => 10 * y + x > tick ? 0 : 1)
  );
  return <Grid data={data} size={36}/>
}

const SimpleModel = () => <Model><Frame /></Model>

export default SimpleModel;
