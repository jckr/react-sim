import React from 'react';
import { Model } from 'react-sim';
import { Flex } from 'rebass';

const FramedModel = ({fmOverrides, ...props}) => (
  <Flex
    sx={{
      border: '1px solid currentcolor',
      my: 2,
      p: 2,
      width: '350px',
    }}
    {...fmOverrides}
  >
    <Model {...props} />
  </Flex>
);

export default FramedModel;
