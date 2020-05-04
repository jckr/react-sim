import React from 'react'
import { Label, Radio as RBRadio } from '@rebass/forms'
import { Flex } from 'rebass'

function Radio({ label, name, options, value, vertical, setValue, ...props }) {
  return (
    <Flex flexDirection='column' mr={1} {...props}>
      {label && <Label>{label}</Label>}
      <Flex flexDirection={vertical ? 'column' : 'row'}>
        {options.map((option) => (
          <Label key={option}>
            <RBRadio
              name={`${name ? name + '-' : ''}${option}`}
              id={`${name ? name + '-' : ''}${option}`}
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
