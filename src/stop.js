import React from 'react';
import TimerButton from './timer-button';
import { withTheme } from './model';
import {iconService} from './constants';

export function Stop(props) {
  const { theme } = props;
  const background = theme?.colors?.background || '';
  const icon = 'stop';
  const content = props.shouldShowReset ? (
    <img
      src={`${iconService}/refresh/${background.replace('#', '')}`}
      style={{ transform: 'scaleX(-1)', display: 'block' }}
      alt='reset'
    />
  ) : (
    <img
      src={`${iconService}/stop/${background.replace('#', '')}`}
      style={{ display: 'block' }}
      alt='stop'
    />
  );
  return <TimerButton onClick={props.stop}>{content}</TimerButton>;
}

export default withTheme(Stop);
