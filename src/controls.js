import React from "react";
import { FlexRow, FlexColumn, Play, Range, Stop } from "./index";

export default class Controls extends React.Component {
  static defaultProps = {
    controls: null,
    minTime: 0,
    maxTime: 100,
    showTime: true,
    updateParams: args => {
      console.log(args);
    }
  };

  renderControls(controls, horizontally = false) {
    if (!controls) {
      return null;
    }
    // if parameter is an array, we render a series of controls
    const Block = horizontally ? FlexColumn : FlexRow;
    if (Array.isArray(controls)) {
      return controls.map((c, i) => (
        <Block
          styles={{ margin: horizontally ? "0 10px 0 0" : "10px 0" }}
          key={`c-${i}`}
        >
          {/* If original parameter is a nested array, we render nested rows of columns */}
          {this.renderControls(c, !horizontally)}
        </Block>
      ));
    }

    // parameter is a single control

    // we can do something different depending on type

    return (
      <Range
        {...controls}
        setValue={value =>
          this.props.updateParams({ param: controls.param, value })
        }
      />
    );
  }

  render() {
    const {
      controls,
      isPlaying,
      play,
      pause,
      stop,
      minTime,
      maxTime,
      showTime,
      time,
      updateParams,
      updateTime
    } = this.props;

    return (
      <FlexColumn>
        {this.renderControls(controls)}
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
      </FlexColumn>
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
