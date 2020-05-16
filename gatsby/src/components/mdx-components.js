import React from 'react';
import Prism from '@theme-ui/prism';

export default {
  pre: props => {
    return props.children;
  },
  code: props => {
    return <Prism {...props} />;
  },
};
