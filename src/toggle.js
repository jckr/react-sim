import React from 'react';
import { Flex } from './ui';

function Toggle({ label, value, setValue, ...props }) {
  return (
    <Flex flexDirection="column" mr={1}>
      {label && (
        <label htmlFor={label} style={{ fontWeight: 600, marginBottom: 8 }}>
          {label}
        </label>
      )}
      <input
        type="checkbox"
        id={label}
        role="switch"
        aria-checked={Boolean(value)}
        checked={Boolean(value)}
        onChange={() => setValue(!value)}
        style={{ width: 40, height: 20, cursor: 'pointer' }}
        {...props}
      />
    </Flex>
  );
}

export default Toggle;
