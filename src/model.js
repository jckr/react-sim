import React from "react";

import { FlexColumn, FlexRow, Controls, Frame } from "./";

export default class Model extends React.Component {
  static defaultProps = {
    auto: true,
    initialData: [],
    initialTick: 0,
    minTime: 0,
    maxTime: 100,
    isPlaying: false,
    timeInterval: 100,
    updateData: (d, t) => d.concat(t)
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
    let updatedIsPlaying = this.state.isPlaying;

    if (this.props.maxTime !== undefined) {
      if (updatedTick === this.props.maxTime) {
        // stop timer
        clearInterval(this.timer);
        updatedIsPlaying = false;
      }
    }
    this.updateData(this.state.data, updatedTick, updatedIsPlaying);
  };
  updateTime = value => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({ tick: Number(value), isPlaying: false });
  };
  setData = value => this.setState({ data: value });
  updateData = (prevData, updatedTick, updatedIsPlaying) => {
    this.setState({
      data: this.props.updateData(prevData, updatedTick),
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
          play={this.play}
          pause={this.pause}
          stop={this.stop}
          updateTime={this.updateTime}
          time={this.state.tick}
        />
      </FlexColumn>
    );
  }
}
