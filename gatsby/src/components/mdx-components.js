import React from 'react';
import Prism from '@theme-ui/prism';

import { Box } from 'rebass';
export default {
  pre: props => {
    return props.children;
  },
  code: props => {
    return (
      <Box bg="muted" py={2} px={3} my={2}>
        <Prism {...props} />
      </Box>
    );
  },
};
