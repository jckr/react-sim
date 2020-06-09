import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from 'rebass';
import { Pagination } from '@theme-ui/sidenav';
import mdxComponents from './mdx-components';
import Head from './head';
import Header from './header';
import { ThemeProvider, useThemeUI } from 'theme-ui';
import { window } from 'global';
import EditLink from './edit-link';
import SourceLink from './source-link';
import Footer from './footer';

const disableFullWidthForHomePage = false;

// derived from rebassjs.org layout file

const Sidebar = ({ Toc, isSmall, location, nav, open, setMenu, ...props }) => {

  return (
    <Flex>
      <Box
        ref={nav}
        open={open}
        onClick={e => {
          if (!isSmall) {
            return;
          }
          setMenu(false);
        }}
        onBlur={e => {
          if (!isSmall) {
            return;
          }
          setMenu(false);
        }}
        onFocus={e => {
          if (!isSmall) {
            return;
          }
          setMenu(true);
        }}
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
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
          transform: [undefined, 'none !important'],
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
        <Toc />
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
        <SourceLink>Code for this example</SourceLink>
        {props.children}
        <EditLink my={5}>Edit this page on GitHub</EditLink>
        <Toc
          pathname={location?.pathname}
          components={{
            wrapper: Pagination,
          }}
        />
      </Box>
    </Flex>
  );
};

export default props => {
  const fullwidth =
    disableFullWidthForHomePage && props.location?.pathname === '/';
  const [menu, setMenu] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const nav = useRef(null);
  const { theme } = useThemeUI();

  if (props.location.search) {
    return (
      <ThemeProvider components={mdxComponents} theme={theme}>
        <main id="content">{props.children}</main>
      </ThemeProvider>
    );
  }

  useEffect(() => {
    const handleSizeChange = ({ matches }) => setIsSmall(matches);
    const breakpoints = theme?.breakpoints || ['40em'];
    const isSmallMQ = window.matchMedia(`(max-width: ${breakpoints[0]})`);
    isSmallMQ.addListener(handleSizeChange);
    setIsSmall(isSmallMQ.matches);

    return isSmallMQ.removeListener(handleSizeChange);
  });


  return (
    <ThemeProvider components={mdxComponents} theme={theme}>
      <div>
        <Head {...props} />
        <Header fullwidth={fullwidth} menu={menu} setMenu={setMenu} nav={nav} />
        {!fullwidth ? (
          <Sidebar
            {...props}
            isSmall={isSmall}
            Toc={props.Toc}
            nav={nav}
            open={menu}
            setMenu={setMenu}
          >
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
