import React from 'react';
import TimerButton from './timer-button';
import { withTheme } from './model';

export function Stop(props) {
  const { theme } = props;
  const background = theme?.colors?.background || '';
  const icon = 'stop';
  const content = props.shouldShowReset ? (
    <img
      src={`https://icon.now.sh/refresh/${background.replace('#', '')}`}
      style={{ transform: 'scaleX(-1)', display: 'block' }}
      alt='reset'
    />
  ) : (
    <img
      src={`https://icon.now.sh/stop/${background.replace('#', '')}`}
      style={{ display: 'block' }}
      alt='stop'
    />
  );
  return <TimerButton onClick={props.stop}>{content}</TimerButton>;
}

export default withTheme(Stop);
