import React from 'react'
import { Label, Select as RBSelect } from '@rebass/forms'
import { Flex } from 'rebass'

function Select({ label, options, value, setValue, ...props }) {
  return (
    <Flex flexDirection='column' mr={1} {...props}>
      {label && <Label htmlFor='label'>{label}</Label>}
      <RBSelect
        id={label}
        name={label}
        value={value}
        onChange={(value) => setValue(value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </RBSelect>
    </Flex>
  )
}

export default Select
