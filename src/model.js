import React from "react";

import { FlexColumn, FlexRow, Controls, Frame } from "./";

export default class Model extends React.Component {
  static defaultProps = {
    auto: true,
    initialData: [],
    initialTick: 0,
    minTime: 0,
    maxTime: 100,
    showTime: true,
    isPlaying: false,
    timeInterval: 100,
    updateData: (d, t) => [d]
  };
  timer = null;
  state = {
    isPlaying: null,
    tick: null
  };
  constructor(props) {
    super(props);
    this.state.data = props.initialData;
    this.state.tick = props.initialTick;
    this.state.isPlaying = props.isPlaying;
  }
  componentDidMount() {
    if (this.props.auto) {
      this.play();
    }
  }
  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }
  play = () => {
    this.timer = setInterval(this.tick, this.props.timeInterval);
    this.setState({ isPlaying: true });
  };
  pause = () => {
    clearInterval(this.timer);
    this.setState({ isPlaying: false });
  };
  stop = () => {
    clearInterval(this.timer);
    this.setState({
      isPlaying: false,
      tick: this.props.initialTick
    });
  };

  tick = () => {
    if (!this.state.isPlaying) {
      return;
    }
    let updatedTick = this.state.tick + 1;
    let shouldStopTicking = false;

    if (this.props.maxTime !== undefined) {
      if (updatedTick >= this.props.maxTime) {
        // stop timer
        clearInterval(this.timer);
        updatedTick = this.props.maxTime;
        shouldStopTicking = true;
      }
    }
    this.updateData(this.state.data, updatedTick, shouldStopTicking);
  };
  updateTime = value => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({ tick: Number(value), isPlaying: false });
  };
  setData = value => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({
      data: value,
      isPlaying: false,
      tick: this.props.initialTick
    });
  };
  updateData = (prevData, updatedTick, shouldStopTicking) => {
    const [updatedData, shouldStopUpdating] = this.props.updateData(
      prevData,
      updatedTick
    );

    // two reasons to stop auto-playing:
    // - it came from tick function - we reached the max time,
    // - it came from the the function that updates data - we reached a special state.

    const updatedIsPlaying = !(shouldStopTicking && shouldStopUpdating);

    // the function that updates data doesn't have access to the timer
    // so if we stop because of that, we need to stop the timer here

    if (shouldStopUpdating) {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }

    this.setState({
      data: updatedData,
      isPlaying: updatedIsPlaying,
      tick: updatedTick
    });
  };
  renderFrame() {
    const children = React.Children.toArray(this.props.children);
    const params = {
      data: this.state.data,
      tick: this.state.tick,
      setData: this.setData
    };
    switch (children.length) {
      case 0:
        return <Frame {...params} />;
      case 1:
        return React.cloneElement(children[0], params);
      default:
        return children.map(child => React.cloneElement(child, params));
    }
  }
  render() {
    return (
      <FlexColumn>
        <FlexRow>{this.renderFrame()}</FlexRow>
        <Controls
          isPlaying={this.state.isPlaying}
          maxTime={this.props.maxTime}
          minTime={this.props.minTime}
          play={this.play}
          pause={this.pause}
          showTime={this.props.showTime}
          stop={this.stop}
          updateTime={this.updateTime}
          time={this.state.tick}
        />
      </FlexColumn>
    );
  }
}
