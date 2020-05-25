import React from 'react';
import styles from './styles.module.css';

export { default as CanvasFrame, CanvasFrameComponent } from './canvas-frame';
export { default as CheckboxComponent } from './checkbox';
export {
  default as Controls,
  Checkbox,
  Input,
  Radio,
  Range,
  Select,
  Timer,
  Toggle
} from './controls';
export { default as Grid, GridComponent } from './grid';
export { default as InputComponent } from './input';
export { default as Model, withTheme, withFrame, withControls } from './model';
export { default as RadioComponent } from './radio';
export { default as RangeComponent } from './range';
export { default as SelectComponent } from './select';
export { default as TimerComponent } from './timer';
export {
  TimeSeries,
  Indicator,
  Counter,
  CounterComponent,
  IndicatorComponent,
  TimeSeriesComponent
} from './time-series';
export { default as ToggleComponent } from './toggle';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};
