import React from 'react';
import { useThemeUI, ThemeProvider } from 'theme-ui';
import { system } from '@theme-ui/presets';
import { FlexColumn, FlexRow, Controls } from './';
import { hasTimer } from './controls';
import { forms } from './constants';

const ThemeContext = React.createContext({});
const FrameContext = React.createContext({});
const ControlsContext = React.createContext({});

export class Model extends React.Component {
  static defaultProps = {
    start: false,
    controls: null,
    initData: () => [],
    initialData: null,
    initialParams: {},
    initialTick: 0,
    delay: 0,
    loop: false,
    minTime: 0,
    maxTime: 100,
    noCache: false,
    noControls: false,
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
    // if the isplaying prop is changed ie by something external to Model
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
    // if canPlay changes
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
    // the fact that we can have a setState callback is the main
    // reason why this is not built with hooks. I can't get the
    // exact same effect with hooks & guarantee that tick will start
    // when isPlaying is true.
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
      this.initData()
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
      // if there is a delay specified, we're only going
      // to update the state if we are passed that delay
      if (timestamp - this.time >= this.state.params.delay) {
        this.time = timestamp;
        this.updateToTick({
          target: this.state.tick + this.state.params.ticksPerAnimation
        });
      }

      // and delay or not, if we can continue looping, we
      // keep on looping
      if (this.state.isPlaying) {
        window.cancelAnimationFrame(this.timer);
        this.timer = window.requestAnimationFrame(this.tick);
      }
    }
  };

  updateToTick = ({ target, shouldStop }) => {
    let data = this.state.data;
    let tick;

    // if we've already computed (and cached) data for a given tick,
    // we'll just retrieve it.
    if (this.cachedData.hasOwnProperty(target)) {
      data = this.cachedData[target];
      tick = target;
    } else {
      // else, we're starting from the last tick for which we cached data.
      // failing that, we start from the current tick.

      if (this.cachedData[this.maxTick]) {
        tick = this.maxTick;
      } else {
        tick = this.state.tick;
      }

      // note - if data is not cached, and user wants
      // to go back in time, before current tick, nothing
      // will happen

      while (tick < target && this.checkCanPlay(tick)) {
        // then, we're going to advance tick by one and update data.
        // however, each time we run the updateData, there's a chance
        // that the simulation completes. In this case, we shouldn't go
        // further.
        //
        // this is what the checkCanPlay method addresses. If false, we
        // stop updating data and tick.
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

        // then, we cache the data which is calculated.
        // it's possible to opt out cache, because if there's no maxTime
        // and the dataset is large and the simulation can't complete (open ended)
        // we'll run out of memory eventually.

        if (!this.props.noCache) {
          this.maxTick = tick;
          this.cachedData[tick] = data;
        }
      }
    }
    // finally we update the state. This will refresh frames

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
    this.setState(() => ({ params: { ...this.state.params, ...params } }));
    if (resetOnChange) {
      this.initData();
    }
  };

  renderFrame = (injectedProps) => {
    if (this.state.data === null) {
      return null;
    }
    const children = React.Children.toArray(this.props.children);

    switch (children.length) {
      case 0:
        return null;
      case 1:
        const child = children[0];
        return React.cloneElement(
          child,
          typeof child.type === 'string' ? {} : injectedProps
        );
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

    return (
      <ThemeContext.Provider value={{ theme: this.props.theme }}>
        <ThemeProvider theme={this.props.theme}>
          <FrameContext.Provider value={frameContext}>
            <ControlsContext.Provider value={controlsContext}>
              <FlexColumn>
                <FlexRow>{this.renderFrame(frameContext)}</FlexRow>
                {this.renderControls(controlsContext)}
              </FlexColumn>
            </ControlsContext.Provider>
          </FrameContext.Provider>
        </ThemeProvider>
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
  let theme = props.theme || { ...system, forms };
  try {
    const context = useThemeUI();
    theme = context.theme || theme;
  } catch (err) {
    console.log('couldnt get theme from context');
  } finally {
    return <Model theme={theme} {...props} />;
  }
}

function getDisplayName(primitive) {
  return typeof primitive === 'string'
    ? primitive
    : primitive.displayName || primitive.name || 'Component';
}

export default ThemedModel;
