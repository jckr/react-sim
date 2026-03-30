import React from 'react';
import { Flex } from './ui';

function Radio({ label, name, options, value, vertical, setValue, ...props }) {
  return (
    <Flex flexDirection="column" mr={1} {...props}>
      {label && <span style={{ fontWeight: 600, marginBottom: 4 }}>{label}</span>}
      <Flex flexDirection={vertical ? 'column' : 'row'}>
        {options.map((option) => {
          const optionLabel = option.label || option;
          const optionValue = option.value || option;
          const inputId = `${name ? `${name}-` : ''}${optionValue}`;
          return (
            <label
              key={optionValue}
              htmlFor={inputId}
              style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 8 }}
            >
              <input
                type="radio"
                name={name || label}
                id={inputId}
                value={optionValue}
                checked={value === optionValue}
                readOnly
                onChange={() => setValue(optionValue)}
              />
              {optionLabel}
            </label>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Radio;
