import React from "react";
import { Label, Input as RBInput } from "@rebass/forms";
import { Flex } from "rebass";

function Input({label, name, value, setValue, ...props}) {
  return (
    <Flex flexDirection="column" mr={1}>
    {label && <Label htmlFor={name || label}>{label}</Label>}
    <RBInput
      id={name || label}
      name={name || label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
    </Flex>
  );
}

export default Input;
