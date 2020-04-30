import { system as base } from '@theme-ui/presets';

console.log(base);

const theme = {
  ...base,
  colors: {
    ...base.colors,
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#a0c',
    accent: '#f0a',
    muted: '#f6f6ff',
    gray: '#444',
    lightgray: '#cfcfd3',
    modes: {
      ...base.colors.modes,
      system: {
        text: '#000',
        background: '#fff',
        primary: '#33e',
        secondary: '#a0c',
        accent: '#f0a',
        muted: '#f6f6ff',
        gray: '#444',
        lightgray: '#cfcfd3',
      },
    },
  },
  links: {
    ...base?.links,
    nav: {
      ...base?.links?.nav,
      display: 'block',
      px: 2,

      py: 1,
      color: 'inherit',
      textDecoration: 'none',
      fontSize: 1,
      fontWeight: 'bold',
      transition: 'color .2s ease-out',
      ':hover,:focus': {
        color: 'secondary',
      },
    },
  },
  styles: {
    ...base.styles,
    a: {
      ...base?.styles?.a,
      color: 'primary',
      transition: 'color .2s ease-out',
      ':hover,:focus': {
        color: 'secondary',
      },
    },
  },
};
export default theme;
