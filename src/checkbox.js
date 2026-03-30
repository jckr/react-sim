import React from 'react';
import { Flex } from './ui';

function Checkbox({ label, name, value, setValue, ...props }) {
  const id = name || label;
  return (
    <Flex mr={1} {...props}>
      <label
        htmlFor={id}
        style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
      >
        <input
          type="checkbox"
          checked={Boolean(value)}
          id={id}
          name={id}
          onChange={() => setValue(!value)}
        />
        {label}
      </label>
    </Flex>
  );
}

export default Checkbox;
