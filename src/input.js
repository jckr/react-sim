import React from 'react';
import { Flex } from './ui';

function Input({ label, name, value, setValue, ...props }) {
  const id = name || label;
  return (
    <Flex flexDirection="column" mr={1}>
      {label && (
        <label htmlFor={id} style={{ fontWeight: 600, marginBottom: 4 }}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        style={{
          border: '1px solid lightgray',
          padding: '6px 8px',
          borderRadius: 4
        }}
        {...props}
      />
    </Flex>
  );
}

export default Input;
