import React from 'react';
import { Controls } from './';
import { Flex } from './ui';
import { hasTimer } from './controls';

const defaultTheme = {
  colors: {
    background: '#ffffff',
    primary: '#07c',
    gray: '#999'
  }
};

const ThemeContext = React.createContext({});
const FrameContext = React.createContext({});
const ControlsContext = React.createContext({});

export class Model extends React.Component {
  static defaultProps = {
    controls: null,
    delay: 0,
    initData: () => void 0,
    initialData: null,
    initialParams: {},
    initialTick: 0,
    loop: false,
    minTime: 0,
    maxTime: 100,
    noCache: false,
    noControls: false,
    onComplete: () => {},
    onAnimate: () => {},
    showTime: true,
    showTimer: true,
    showTimeSlider: true,
    isPlaying: false,
    ticksPerAnimation: 1,
    updateData: ({ data }) => data
  };
  timer = null;
  time = null;

  cachedData = {};
  maxTick = -Infinity;

  state = {
    canPlay: true,
    isPlaying: null,
    results: [],
    tick: null
  };
  constructor(props) {
    super(props);
    this.state.data = props.initialData;
    this.state.params = {
      delay: this.props.delay,
      minTime: this.props.minTime,
      maxTime: this.props.maxTime,
      ticksPerAnimation: this.props.ticksPerAnimation,
      ...props.initialParams
    };
    this.state.tick = props.initialTick;
    this.state.isPlaying = props.isPlaying;
  }
  componentDidMount() {
    this.initData();
  }
  componentDidUpdate(prevState) {
    if (this.props.isPlaying !== prevState.isPlaying) {
      if (this.props.isPlaying) {
        if (this.state.canPlay) {
          this.play();
          return;
        }
      } else {
        this.pause();
        return;
      }
    }
    if (this.state.canPlay !== prevState.canPlay) {
      if (!this.state.canPlay && this.props.loop) {
        this.setState(
          () => ({ canPlay: true, isPlaying: true }),
          this.initData
        );
      }
    }
  }
  componentWillUnmount() {
    if (this.timer !== null) {
      window.cancelAnimationFrame(this.timer);
    }
  }

  complete = (result) => {
    const { results } = this.state;
    results.push(result);
    this.props.onComplete(results);
    this.setState(() => ({ canPlay: false, results }));
  };

  initData = () => {
    const data = this.props.initData(this.state.params);
    const tick = this.props.minTime || this.props.initialTick;

    this.cachedData = {};
    this.maxTick = tick;
    if (!this.props.noCache) {
      this.cachedData[this.maxTick] = data;
    }

    this.setState({
      canPlay: true,
      tick,
      data
    });
    if (this.state.isPlaying) {
      this.play();
    }
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

    this.setState(
      () => ({
        isPlaying: false,
        tick: this.props.minTime || this.props.initialTick
      }),
      () => this.initData()
    );
  };

  checkCanPlay = (tick) => {
    if (
      this.state.canPlay === false ||
      (this.state.params.maxTime !== undefined &&
        tick >= this.state.params.maxTime)
    ) {
      this.setState(() => ({
        canPlay: false,
        isPlaying: false
      }));
      return false;
    }
    return true;
  };

  tick = (timestamp) => {
    if (this.checkCanPlay(this.state.tick)) {
      if (this.time === null) {
        this.time = timestamp;
      }
      if (timestamp - this.time >= this.state.params.delay) {
        this.time = timestamp;
        this.updateToTick({
          target: this.state.tick + this.state.params.ticksPerAnimation
        });
      }

      if (this.state.isPlaying) {
        window.cancelAnimationFrame(this.timer);
        this.timer = window.requestAnimationFrame(this.tick);
      }
    }
  };

  updateToTick = ({ target, shouldStop }) => {
    let data = this.state.data;
    let tick;

    if (this.cachedData.hasOwnProperty(target)) {
      data = this.cachedData[target];
      tick = target;
    } else {
      if (this.cachedData[this.maxTick]) {
        tick = this.maxTick;
      } else {
        tick = this.state.tick;
      }

      while (tick < target && this.checkCanPlay(tick)) {
        tick++;
        data = this.props.updateData({
          cachedData: this.cachedData,
          data,
          tick,
          params: this.state.params,
          complete: this.complete,
          stop: this.stop,
          pause: this.pause
        });

        if (!this.props.noCache) {
          this.maxTick = tick;
          this.cachedData[tick] = data;
        }
      }
    }
    this.props.onAnimate({
      data,
      tick
    });

    this.setState(() => ({
      data,
      tick,
      ...(shouldStop ? { isPlaying: false } : {})
    }));
  };

  updateTime = (value) => {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer);
    }
    this.updateToTick({ target: Number(value), shouldStop: true });
  };

  setData = (value) => {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer);
    }
    this.setState({
      data: value,
      isPlaying: false,
      tick: this.props.initialTick
    });
  };
  setParams = (params, resetOnChange) => {
    this.setState(
      () => ({ params: { ...this.state.params, ...params } }),
      () => {
        if (resetOnChange) {
          this.initData();
        }
      }
    );
  };

  renderFrame = (injectedProps) => {
    if (this.state.data === null) {
      return null;
    }
    const children = React.Children.toArray(this.props.children);

    switch (children.length) {
      case 0:
        return null;
      case 1: {
        const child = children[0];
        return React.cloneElement(
          child,
          typeof child.type === 'string' ? {} : injectedProps
        );
      }
      default:
        return children.map((child) => {
          return React.cloneElement(
            child,
            typeof child.type === 'string' ? {} : injectedProps
          );
        });
    }
  };

  hasControls = (children) => {
    let result = false;
    React.Children.forEach(children, (child) => {
      if (!result) {
        const componentName = getDisplayName(child);

        if (
          componentName === 'Controls' ||
          componentName.startsWith('withControls')
        ) {
          result = true;
        }
      } else {
        if (child.props.children && child.props.children.length) {
          result = this.hasControls(child.props.children);
        }
      }
    });
    return result;
  };

  renderControls = (injectedProps) => {
    if (this.props.noControls) {
      return null;
    }
    if (this.hasControls(this.props.children)) {
      return null;
    }

    const controls = this.props.controls;
    let shouldAddTimer = this.props.showTimer && !hasTimer(controls);

    const updatedControls = [];
    if (controls) {
      if (Array.isArray(controls)) {
        controls.forEach((c) => updatedControls.push(c));
      } else {
        updatedControls.push(controls);
      }
    }
    if (shouldAddTimer) {
      updatedControls.push({
        type: 'timer',
        isPlaying: this.state.isPlaying,
        maxTime: this.state.params.maxTime,
        minTime: this.state.params.minTime,
        play: this.play,
        pause: this.pause,
        showTime: this.props.showTime,
        showTimeSlider: this.props.showTimeSlider,
        stop: this.stop,
        updateTime: this.updateTime,
        time: this.state.tick
      });
    }

    return <Controls controls={updatedControls} {...injectedProps} />;
  };

  render() {
    const frameContext = {
      cachedData: this.cachedData,
      data: this.state.data,
      initData: this.initData,
      params: this.state.params,
      results: this.state.results,
      tick: this.state.tick,
      setData: this.setData
    };

    const controlsContext = {
      isPlaying: this.state.isPlaying,
      params: this.state.params,
      pause: this.pause,
      play: this.play,
      setParams: this.setParams,
      stop: this.stop,
      tick: this.state.tick,
      updateTime: this.updateTime
    };

    const theme = this.props.theme || defaultTheme;

    return (
      <ThemeContext.Provider value={{ theme }}>
        <FrameContext.Provider value={frameContext}>
          <ControlsContext.Provider value={controlsContext}>
            <Flex flexDirection="column">
              <Flex>{this.renderFrame(frameContext)}</Flex>
              {this.renderControls(controlsContext)}
            </Flex>
          </ControlsContext.Provider>
        </FrameContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export function withTheme(Component) {
  return function ThemeComponent(props) {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => <Component theme={theme} {...props} />}
      </ThemeContext.Consumer>
    );
  };
}

export function withFrame(Component) {
  function FrameComponent(props) {
    return (
      <FrameContext.Consumer>
        {({ cachedData, data, initData, params, results, setData, tick }) => (
          <Component
            cachedData={cachedData}
            data={data}
            initData={initData}
            params={params}
            setData={setData}
            tick={tick}
            {...props}
          />
        )}
      </FrameContext.Consumer>
    );
  }
  const componentName = getDisplayName(Component);
  FrameComponent.displayName = `withFrame(${componentName})`;
  return FrameComponent;
}

export function withControls(Component) {
  function ControlsComponent(props) {
    return (
      <ControlsContext.Consumer>
        {({ isPlaying, params, pause, play, setParams, stop, updateTime }) => (
          <Component
            isPlaying={isPlaying}
            params={params}
            pause={pause}
            play={play}
            setParams={setParams}
            stop={stop}
            updateTime={updateTime}
            {...props}
          />
        )}
      </ControlsContext.Consumer>
    );
  }
  const componentName = getDisplayName(Component);
  ControlsComponent.displayName = `withControls(${componentName})`;
  return ControlsComponent;
}

function ThemedModel(props) {
  const theme = props.theme || defaultTheme;
  return <Model theme={theme} {...props} />;
}

function getDisplayName(primitive) {
  return typeof primitive === 'string'
    ? primitive
    : primitive?.displayName || primitive?.name || 'Component';
}

export default ThemedModel;
