import React from 'react'
import { Flex } from 'rebass'
import {Pause, Play, Range, Stop, withControls} from './';

function Timer({
  isPlaying,
  maxTime,
  minTime,
  pause,
  play,
  showTime,
  stop,
  time,
  updateTime,
  label = 'Time'
}) {
  return (
    <Flex sx={{ alignItems: 'center', flexDirection: 'row' }}>
      <Play isPlaying={isPlaying} play={play} pause={pause} />
      <Stop isPlaying={isPlaying} stop={stop} />
      {showTime && (
        <Range
          minValue={minTime}
          maxValue={maxTime}
          value={time}
          setValue={updateTime}
          label='Time'
        />
      )}
    </Flex>
  )
}

export default Timer;
