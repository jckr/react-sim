import React from "react";

import { FlexColumn, FlexRow, Controls, Frame } from "./";

export default class Model extends React.Component {
  static defaultProps = {
    start: false,
    controls: null,
    initData: () => null,
    initialData: null,
    initialParams: {},
    initialTick: 0,
    delay: 0,
    minTime: 0,
    maxTime: 100,
    showTime: true,
    isPlaying: false,
    timeInterval: 100,
    updateData: ({data}) => data
  };
  timer = null;
  time = null;
  state = {
    canPlay: true,
    isPlaying: null,
    tick: null
  };
  constructor(props) {
    super(props);
    this.state.data = props.initialData;
    this.state.params = props.initialParams;
    this.state.tick = props.initialTick;
    this.state.isPlaying = props.isPlaying;
  }
  componentDidMount() {
    this.initData();
  }
  componentDidUpdate() {
    if (this.props.start && this.state.canPlay) {
      this.play();
    }
  }
  componentWillUnmount() {
    if (this.timer !== null) {
      window.cancelAnimationFrame(this.timer);
    }
  }

  complete = () => {
    this.setState(() => ({ canPlay: false }));
  };
  initData = () => {
    this.setState({
      canPlay: true,
      tick: this.props.initialTick,
      data: this.props.initData(this.state.params)
    });
  };

  play = () => {
    this.setState(
      () => ({ isPlaying: true }),
      () => {
        this.timer = window.requestAnimationFrame(this.tick);
      }
    );
  };
  pause = () => {
    window.cancelAnimationFrame(this.timer);
    this.setState(() => ({ isPlaying: false }));
  };
  stop = () => {
    window.cancelAnimationFrame(this.timer);
    this.setState(() => ({
      isPlaying: false,
      tick: this.props.initialTick
    }));
  };

  tick = timestamp => {
    if (
      this.state.canPlay === false ||
      (this.props.maxTime !== undefined &&
        this.state.tick >= this.props.maxTime)
    ) {
      return this.setState(() => ({
        isPlaying: false
      }));
    }

    if (this.time === null) {
      this.time = timestamp;
    }
    // if there is a delay specified, we're only going
    // to update the state if we are passed that delay
    if (timestamp - this.time >= this.props.delay) {
      const updatedTick = this.state.tick + 1;
      this.time = timestamp;
      this.updateData(updatedTick);
    }

    // and delay or not, if we can continue looping, we
    // keep on looping
    if (this.state.isPlaying) {
      window.cancelAnimationFrame(this.timer);
      this.timer = window.requestAnimationFrame(this.tick);
    }
  };

  updateData = (tick, stop) => {
    const updatedData = this.props.updateData({
      data: this.state.data,
      tick,
      params: this.state.params,
      complete: this.complete,
      stop: this.stop,
      pause: this.pause
    });

    this.setState(() => ({
      data: updatedData,
      tick,
      ...(stop ? { isPlaying: false } : {})
    }));
  };

  updateTime = value => {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer);
    }
    this.updateData(Number(value), true);
  };

  setData = value => {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer);
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
          params={this.state.params}
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
