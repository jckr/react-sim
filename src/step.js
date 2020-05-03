import React from 'react';
import TimerButton from './timer-button';
import { withTheme } from './model';

export function Step(props) {
  const { theme } = props;
  const background = theme?.colors?.background || '';
  const icon = 'slow_motion_video';
  const content = (
    <img
      src={`https://icon.now.sh/${icon}/${background.replace('#', '')}`}
      alt='step in'
    />
  );

  return <TimerButton onClick={props.step}>{content}</TimerButton>;
}

export default withTheme(Step);
