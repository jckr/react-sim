import React from 'react';
import TimerButton from './timer-button';
import { withTheme } from './model';

function Play(props) {
  const { theme } = props;
  const background = theme?.colors?.background || '';
  const icon = props.isPlaying ? 'pause' : 'play_arrow';
  const content = (
    <img
      src={`https://icon.now.sh/${icon}/${background.replace('#', '')}`}
      style={{ display: 'block' }}
      alt={icon}
    />
  );
  return (
    <TimerButton onClick={props.isPlaying ? props.pause : props.play}>
      {content}
    </TimerButton>
  );
}

export default withTheme(Play);
