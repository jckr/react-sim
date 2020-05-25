import React, { useState, useRef } from 'react';
import { Box, Flex } from 'rebass';
import { Pagination } from '@theme-ui/sidenav';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdx-components';
import Head from './head';
import Header from './header';
import Nav from './nav';
import {ThemeProvider, useThemeUI} from 'theme-ui';

import EditLink from './edit-link';
import Footer from './footer';

const disableFullWidthForHomePage = false;

// derived from rebassjs.org layout file

const Sidebar = props => (
  <Flex>
    <Box
      ref={props.nav}
      open={props.open}
      onClick={e => {
        props.setMenu(false);
      }}
      onBlur={e => {
        props.setMenu(false);
      }}
      onFocus={e => {
        props.setMenu(true);
      }}
      style={{
        transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
      }}
      sx={{
        position: ['fixed', 'sticky'],
        zIndex: 1,
        top: 0,
        left: 0,
        bottom: [0, 'auto'],
        width: [256, 256, 320],
        minWidth: 0,
        maxHeight: ['100vh', 'none'],
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        flex: 'none',
        px: 3,
        mt: [64, 0],
        pb: 3,
        bg: ['background', 'transparent'],
        transition: 'transform .2s ease-out',
        transform: [, 'none !important'],
        ul: {
          listStyle: 'none',
          padding: 0,
        },
        a: {
          variant: 'links.nav',
        },
        'li > ul > li > a': {
          pl: '24px',
        },
      }}
    >
      <Nav />
    </Box>
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        maxWidth: 768,
        minHeight: 'calc(100vh - 64px)',
        mx: 'auto',
        px: [3, 4],
        pb: 5,
      }}
    >
      {props.children}
      <EditLink my={5}>Edit this page on GitHub</EditLink>
      <Nav
        pathname={props.location?.pathname}
        components={{
          wrapper: Pagination,
        }}
      />
    </Box>
  </Flex>
);

export default props => {
  const fullwidth =
    disableFullWidthForHomePage && props.location?.pathname === '/';
  const [menu, setMenu] = useState(false);
  const nav = useRef(null);
  const {theme} = useThemeUI();

  return (
    <ThemeProvider components={mdxComponents} theme={theme}>
      <div>
        <Head {...props} />
        <Header fullwidth={fullwidth} menu={menu} setMenu={setMenu} nav={nav} />
        {!fullwidth ? (
          <Sidebar {...props} nav={nav} open={menu} setMenu={setMenu}>
            <main id="content">{props.children}</main>
          </Sidebar>
        ) : (
          <main id="content">{props.children}</main>
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
};
