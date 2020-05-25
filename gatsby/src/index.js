import React from 'react';
import Layout from './components/layout';
import Nav from './components/nav.mdx';
export { default as Layout } from './components/layout';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props} Toc={Nav}>{element}</Layout>;
};
