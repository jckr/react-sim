import { system as base } from '@theme-ui/presets';

// prism colors inspired, but not identical, from theme-ui prism default
// so they are theme dependent.
const prism = {
  '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
    color: 'gray',
  },
  '.comment': { fontStyle: 'italic' },
  '.property, .tag, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable': {
    color: 'primary',
  },
  '.atrule, .attr-value, .keyword, .boolean, .number, .string': {
    color: 'secondary',
  },
  '.selector, .attr-name,  .char, .builtin, .inserted': {
    color: 'text',
  },
};

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
    pre: prism,
    table: {
      borderSpacing: 0,
      width: '100%',
      th: {
        backgroundColor: 'muted',
        textAlign: 'left',
        pl: 2,
        pr: 2,
        py: 2,
        m: 0,
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderStyle: 'solid',
        borderColor: 'gray',
        ':first-of-type': {
          borderLeftWidth: '1px',
        },
        ':last-of-type': {
          borderRightWidth: '1px',
        },
      },
      td: {
        fontSize: 1,
        m: 0,
        pl: 2,
        pr: 2,
        py: 2,
        borderTopWidth: 0,
        borderBottomWidth: '1px',
        borderLeftWidth: 0,
        borderRightWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'gray',
        ':first-of-type': {
          borderLeftWidth: '1px',
        },
        strong: { wordBreak: ['break-all', 'normal'] },
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
  breakpoints: ['40em', '52em', '64em'],
};

export default theme;
