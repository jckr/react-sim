import React from 'react';
import { Model } from 'react-sim';
import { Flex } from 'rebass';


const FramedModel = props => (
  <Flex sx={{ border: '1px solid currentcolor', my: 2, mx: 'auto', p: 2, width: '350px' }}>
    <Model {...props} />
  </Flex>
);

export default FramedModel;
