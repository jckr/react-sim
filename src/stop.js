import React from "react";
import TimerButton from "./timer-button";
import { withTheme } from "./model";

export function Stop(props) {
  const { theme } = props;
  const background = theme?.colors?.background || '';
  const icon = "stop";
  const content = (
    <img
      src={`https://icon.now.sh/${icon}/${background.replace("#", "")}`}
      alt={icon}
    />
  );
  return <TimerButton onClick={props.stop}>{content}</TimerButton>;
}

export default withTheme(Stop);
