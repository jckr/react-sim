import React from 'react'
import { Label, Select as RBSelect } from '@rebass/forms'
import { Flex } from 'rebass'

function Select({ label, name, options, value, setValue, ...props }) {
  return (
    <Flex flexDirection='column' mr={1} {...props}>
      {label && <Label htmlFor={name || label}>{label}</Label>}
      <RBSelect
        id={name || label}
        name={name || label}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </RBSelect>
    </Flex>
  )
}

export default Select
