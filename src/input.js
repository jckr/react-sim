import React from "react";
import { Label, Input as RBInput } from "@rebass/forms";
import { Flex } from "rebass";

function Input({label, value, setValue, ...props}) {
  return (
    <Flex flexDirection="column" mr={1}>
    {label && <Label htmlFor={label}>{label}</Label>}
    <RBInput
      id={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
    </Flex>
  );
}

export default Input;
