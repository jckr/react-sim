import React from 'react';
import { Model } from 'react-sim';
import { Flex } from 'rebass';

export const FullWidthModel = props => (
  <Flex sx={{ border: '1px solid currentcolor', my: 2, p: 2 }}>
    <Model {...props} />
  </Flex>
);

export const FitContentModel = props => (
  <Flex
    sx={{ border: '1px solid currentcolor', my: 2, p: 2, width: 'fit-content' }}
  >
    <Model {...props} />
  </Flex>
);
