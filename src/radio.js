import React from 'react'
import { Label, Radio as RBRadio } from '@rebass/forms'
import { Flex } from 'rebass'

function Radio({ label, options, value, vertical, setValue, ...props }) {
  return (
    <Flex flexDirection='column' mr={1} {...props}>
      {label && <Label>{label}</Label>}
      <Flex flexDirection={vertical ? 'column' : 'row'}>
        {options.map((option) => (
          <Label key={option}>
            <RBRadio
              name={option}
              id={option}
              value={option}
              checked={value === option}
              onClick={() => setValue(option)}
            />
            {option}
          </Label>
        ))}
      </Flex>
    </Flex>
  )
}

export default Radio
