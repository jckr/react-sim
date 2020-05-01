import React from 'react'
import { Label, Checkbox as RBCheckbox } from '@rebass/forms'
import { Flex } from 'rebass'

function Checkbox({ label, value, setValue, ...props }) {
  return (
    <Flex mr={1} {...props}>
      <Label htmlFor={label}>
        <RBCheckbox
          checked={value}
          id={label}
          value={value}
          name={label}
          onClick={() => setValue(!value)}
        />
        {label}
      </Label>
    </Flex>
  )
}

export default Checkbox
