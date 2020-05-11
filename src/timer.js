import React from 'react'
import { Flex } from 'rebass'
import Play from './play';
import Step from './step';
import Range from './range';
import Stop from './stop';

function Timer({
  isPlaying,
  label = 'Time',
  name = 'Time',
  maxTime = 100,
  minTime = 0,
  pause,
  play,
  showTimeSlider = true,
  showTime = true,
  stop,
  time,
  updateTime,
  ...rangeProps
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
          name={name}
          value={time}
          setValue={updateTime}
          shouldDisplaySlider={showTimeSlider}
          label={label}
          {...rangeProps}
        />
      )}
    </Flex>
  )
}

export default Timer;
