import React from "react";
import { FlexRow, FlexColumn, Play, Range, Stop } from "./index";

export default class Controls extends React.Component {
  static defaultProps = {
    minTime: 0,
    maxTime: 100,
    showTime: true,
  };

  render() {
    const {
      isPlaying,
      play,
      pause,
      stop,
      minTime,
      maxTime,
      showTime,
      time,
      updateTime
    } = this.props;
    return (
      <FlexRow styles={{ alignItems: "center" }}>
        <FlexColumn>
          <Play isPlaying={isPlaying} play={play} pause={pause} />
        </FlexColumn>
        <FlexColumn>
          <Stop isPlaying={isPlaying} stop={stop} />
        </FlexColumn>
        {showTime && (
          <Range
            minValue={minTime}
            maxValue={maxTime}
            value={time}
            setValue={updateTime}
            label="Time"
          />
        )}
      </FlexRow>
    );
  }
}

export class StatefulControls extends React.Component {
  state = {
    time: 0,
    isPlaying: false
  };
  play = () => this.setState({ isPlaying: true });
  pause = () => this.setState({ isPlaying: false });
  stop = () => this.setState({ isPlaying: false, time: 0 });

  updateTime = value => this.setState({ time: Number(value) });
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
    );
  }
}
