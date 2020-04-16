import React from "react";

import { FlexColumn, FlexRow, Controls, Frame } from "./";

export default class Model extends React.Component {
  static defaultProps = {
    auto: true,
    controls: null,
    initData: () => null,
    initialData: null,
    initialParams: {},
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
    (this.state.params = props.initialParams),
      (this.state.tick = props.initialTick);
    this.state.isPlaying = props.isPlaying;
  }
  componentDidMount() {
    this.initData();
    if (this.props.auto) {
      this.play();
    }
  }
  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  initData = () => {
    this.setData(this.props.initData(this.state.params));
  };

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
  setParams = params => {
    this.setState({ params: { ...this.state.params, ...params } });
  };
  updateData = (prevData, updatedTick, shouldStopTicking) => {
    const updatedData = this.props.updateData({
      data: prevData,
      tick: updatedTick,
      params: this.state.params,
      stop: this.stop,
      pause: this.pause
    });

    // two reasons to stop auto-playing:
    // - it came from tick function - we reached the max time,
    // - it came from the the function that updates data - we reached a special state.

    const updatedIsPlaying = !shouldStopTicking;

    this.setState({
      data: updatedData,
      isPlaying: updatedIsPlaying,
      tick: updatedTick
    });
  };
  renderFrame() {
    const children = React.Children.toArray(this.props.children);
    const injectedProps = {
      data: this.state.data,
      initData: this.initData,
      params: this.state.params,
      tick: this.state.tick,
      setData: this.setData
    };
    switch (children.length) {
      case 0:
        return <Frame {...injectedProps} />;
      case 1:
        return React.cloneElement(children[0], injectedProps);
      default:
        return children.map(child => React.cloneElement(child, injectedProps));
    }
  }
  render() {
    return (
      <FlexColumn>
        <FlexRow>{this.renderFrame()}</FlexRow>
        <Controls
          controls={this.props.controls}
          isPlaying={this.state.isPlaying}
          maxTime={this.props.maxTime}
          minTime={this.props.minTime}
          play={this.play}
          pause={this.pause}
          showTime={this.props.showTime}
          stop={this.stop}
          setParams={this.setParams}
          updateTime={this.updateTime}
          time={this.state.tick}
        />
      </FlexColumn>
    );
  }
}
