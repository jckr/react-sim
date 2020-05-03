import React from 'react'
import { Flex } from 'rebass'
import {Pause, Play, Range, Stop, Step, withControls} from './';

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
  const step = () => updateTime(time + 1);

  return (
    <Flex sx={{ alignItems: 'center', flexDirection: 'row' }}>
      <Play isPlaying={isPlaying} play={play} pause={pause} />
      <Stop shouldShowReset={isPlaying === false && time === minTime} stop={stop} />
      <Step isPlaying={isPlaying} step={step} />
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
