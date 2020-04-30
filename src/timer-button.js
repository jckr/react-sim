import React from "react";
import { Button } from "rebass";
import { withTheme } from "./model";

function TimerButton(props) {
  return (
    <Button
      px={2}
      py={1}
      mr={2}
      lineHeight={1}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default TimerButton;
