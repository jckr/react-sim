import React from 'react';
import { Flex } from './ui';

function Select({ label, name, options, value, setValue, ...props }) {
  const id = name || label;
  return (
    <Flex flexDirection="column" mr={1} {...props}>
      {label && (
        <label htmlFor={id} style={{ fontWeight: 600, marginBottom: 4 }}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        style={{
          border: '1px solid lightgray',
          padding: '6px 8px',
          borderRadius: 4
        }}
      >
        {options.map((option) => {
          const optLabel = option.label || option;
          const optValue = option.value || option;
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
    </Flex>
  );
}

export default Select;
