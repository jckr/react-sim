import React from 'react'
import { Label, Checkbox as RBCheckbox } from '@rebass/forms'
import { Flex } from 'rebass'

function Checkbox({ label, name, value, setValue, ...props }) {
  return (
    <Flex mr={1} {...props}>
      <Label htmlFor={name || label}>
        <RBCheckbox
          checked={value}
          id={name || label}
          value={value}
          name={name || label}
          readOnly
          onClick={() => setValue(!value)}
        />
        {label}
      </Label>
    </Flex>
  )
}

export default Checkbox
