import React from 'react';
import Prism from '@theme-ui/prism';
import { useThemeUI } from 'theme-ui'

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
  table: props => {
    const { children, ...otherProps } = props;
    return (
      <table {...otherProps}>
        <colgroup>
          <col width="30%" />
          <col width="70%" />
        </colgroup>
        {children}
      </table>
    );
  }
};
