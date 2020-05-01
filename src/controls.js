import React from 'react'
import {
  Checkbox,
  FlexRow,
  FlexColumn,
  Input,
  Play,
  Radio,
  Range,
  Select,
  Stop,
  Timer,
  Toggle
} from './index'

export default class Controls extends React.Component {
  static defaultProps = {
    controls: null,
    minTime: 0,
    maxTime: 100,
    showTime: true,
    showTimer: true,
    updateParams: (args) => {
      console.log(args)
    }
  }
  state = { input: '', radio: 'jet', toggled: false }
  renderControls(controls, horizontally = false) {
    if (!controls) {
      return null
    }
    // if parameter is an array, we render a series of controls
    const Block = horizontally ? FlexColumn : FlexRow
    if (Array.isArray(controls)) {
      return controls.map((c, i) => (
        <Block
          styles={{ margin: horizontally ? '0 10px 0 0' : '10px 0' }}
          key={`c-${i}`}
        >
          {/* If original parameter is a nested array, we render nested rows of columns */}
          {this.renderControls(c, !horizontally)}
        </Block>
      ))
    }

    // parameter is a single control

    // we can do something different depending on type

    const paramName = controls.param
    const { params } = this.props

    return (
      <Range
        label={paramName}
        setValue={(value) => this.props.setParams({ [paramName]: value })}
        value={params[paramName]}
        {...controls}
      />
    )
  }

  render() {
    const {
      controls,
      isPlaying,
      pause,
      play,
      maxTime,
      minTime,
      setParams,
      showTime,
      showTimer,
      stop,
      time,
      timerLabel,
      updateTime
    } = this.props

    return (
      <FlexColumn>
        {this.renderControls(controls)}
        {showTimer && (
          <Timer
            isPlaying={isPlaying}
            maxTime={maxTime}
            minTime={minTime}
            pause={pause}
            play={play}
            stop={stop}
            time={time}
            updateTime={updateTime}
            label={timerLabel}
          />
        )}
      </FlexColumn>
    )
  }
}

export class StatefulControls extends React.Component {
  state = {
    time: 0,
    isPlaying: false
  }
  play = () => this.setState({ isPlaying: true })
  pause = () => this.setState({ isPlaying: false })
  stop = () => this.setState({ isPlaying: false, time: 0 })

  updateTime = (value) => this.setState({ time: Number(value) })
  render() {
    return (
      <Controls
        {...this.props}
        {...this.state}
        play={this.play}
        pause={this.pause}
        stop={this.stop}
        updateTime={this.updateTime}
      />
    )
  }
}
