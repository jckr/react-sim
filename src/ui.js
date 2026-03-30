import React from 'react';

/** Theme-UI spacing: n → n * 4px */
function space(n) {
  if (n == null) return undefined;
  return typeof n === 'number' ? `${n * 4}px` : n;
}

/** Map subset of theme-ui `sx` keys to CSS for legacy call sites */
export function sxStyle(sx) {
  if (!sx || typeof sx !== 'object') return {};
  const out = {};
  for (const [key, raw] of Object.entries(sx)) {
    const v = Array.isArray(raw) ? raw[0] : raw;
    if (v === undefined) continue;
    switch (key) {
      case 'variant':
        break;
      case 'bg':
        out.backgroundColor = v;
        break;
      case 'color':
        out.color = v;
        break;
      case 'mt':
        out.marginTop = space(v);
        break;
      case 'mb':
        out.marginBottom = space(v);
        break;
      case 'mr':
        out.marginRight = space(v);
        break;
      case 'ml':
        out.marginLeft = space(v);
        break;
      case 'mx':
        out.marginLeft = space(v);
        out.marginRight = space(v);
        break;
      case 'my':
        out.marginTop = space(v);
        out.marginBottom = space(v);
        break;
      case 'padding':
        out.padding = space(v);
        break;
      case 'height':
        out.height =
          typeof v === 'number'
            ? `${v}px`
            : Array.isArray(v)
              ? `${v[0]}px`
              : v;
        break;
      case 'width':
        if (typeof v === 'string') {
          out.width = v;
        } else if (typeof v === 'number') {
          out.width = `${v}px`;
        } else if (Array.isArray(v)) {
          out.width = `${v[0]}px`;
        } else {
          out.width = v;
        }
        break;
      case 'minWidth':
        out.minWidth = Array.isArray(v) ? `${v[0]}px` : v;
        break;
      case 'fontSize':
        if (typeof v === 'number') {
          const map = { 0: '12px', 1: '14px', 2: '16px', 5: '24px' };
          out.fontSize = map[v] ?? `${v * 4}px`;
        } else {
          out.fontSize = v;
        }
        break;
      case 'fontWeight':
        out.fontWeight = v;
        break;
      case 'borderRadius':
        out.borderRadius = v;
        break;
      case 'userSelect':
        out.userSelect = v;
        break;
      case 'cursor':
        out.cursor = v;
        break;
      case 'alignItems':
        out.alignItems = v;
        break;
      case 'flexWrap':
        out.flexWrap = v;
        break;
      case 'flex':
        out.flex = v;
        break;
      case 'justifyContent':
        out.justifyContent = v;
        break;
      default:
        out[key] = v;
    }
  }
  return out;
}

export function Flex({
  children,
  flexDirection = 'row',
  alignItems,
  justifyContent,
  flexWrap,
  flex,
  mr,
  mb,
  mt,
  mx,
  my,
  sx,
  style,
  ...rest
}) {
  const base = {
    display: 'flex',
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    flex
  };
  if (mr != null) base.marginRight = space(mr);
  if (mb != null) base.marginBottom = space(mb);
  if (mt != null) base.marginTop = space(mt);
  if (mx != null) {
    base.marginLeft = space(mx);
    base.marginRight = space(mx);
  }
  if (my != null) {
    base.marginTop = space(my);
    base.marginBottom = space(my);
  }
  return (
    <div style={{ ...base, ...sxStyle(sx), ...style }} {...rest}>
      {children}
    </div>
  );
}

export function Box({ children, sx, style, ...rest }) {
  return (
    <div style={{ ...sxStyle(sx), ...style }} {...rest}>
      {children}
    </div>
  );
}

export function Text({ children, sx, style, onClick, ...rest }) {
  return (
    <span style={{ ...sxStyle(sx), ...style }} onClick={onClick} {...rest}>
      {children}
    </span>
  );
}

export function Button({ children, px, py, mr, lineHeight, style, ...rest }) {
  return (
    <button
      type="button"
      style={{
        paddingLeft: space(px),
        paddingRight: space(px),
        paddingTop: space(py),
        paddingBottom: space(py),
        marginRight: space(mr),
        lineHeight: lineHeight != null ? String(lineHeight) : undefined,
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: 4,
        background: '#f8f8f8',
        ...style
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
