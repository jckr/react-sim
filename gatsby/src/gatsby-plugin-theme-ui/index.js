import { system as base } from '@theme-ui/presets';

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
  forms: {
    label: { fontSize: 1, fontWeight: 'bold' },
    field: {
      borderColor: 'lightgray',
      ':focus': { borderColor: 'primary', outline: 'none' },
    },
    input: { variant: 'forms.field' },
    select: { variant: 'forms.field' },
    textarea: { variant: 'forms.field' },
    radio: {},
    slider: { bg: 'lightgray' },
    switch: {},
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
  variants: {
    ...base?.variants,
    nav: {
      ...base?.variants?.nav,
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': { color: 'primary' },
    },
  },
};

export default theme;