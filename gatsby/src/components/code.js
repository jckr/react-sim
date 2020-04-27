import React from 'react';
import Prism from '@theme-ui/prism';

export default ({ className, ...props }) => {
  console.log("clc");
  return (
  <Prism className={className} {...props} />
);}
