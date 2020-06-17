import React from 'react';
import { Label, Radio as RBRadio } from '@rebass/forms';
import { Flex } from 'rebass';

function Radio({ label, name, options, value, vertical, setValue, ...props }) {
  return (
    <Flex flexDirection='column' mr={1} {...props}>
      {label && <Label>{label}</Label>}
      <Flex flexDirection={vertical ? 'column' : 'row'}>
        {options.map((option) => {
          const optionLabel = option.label || option;
          const optionValue = option.value || option;
          return (
            <Label key={optionValue}>
              <RBRadio
                name={`${name ? name + '-' : ''}${optionValue}`}
                id={`${name ? name + '-' : ''}${optionValue}`}
                value={optionValue}
                checked={value === optionValue}
                onClick={() => setValue(optionValue)}
                readOnly
              />
              {optionLabel}
            </Label>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Radio;
