import React from "react";
import { Label, Switch } from "@rebass/forms";
import { Flex } from "rebass";

function Toggle({label, value, setValue, ...props}) {
  return (
    <Flex flexDirection="column" mr={1}>
    {label && <Label htmlFor={label} mb={1}>{label}</Label>}
    <Switch
      id={label}
      checked={value}
      onClick={() => setValue(!value)}
      {...props}
    />
    </Flex>
  );
}

export default Toggle;
