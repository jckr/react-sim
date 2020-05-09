import React from 'react';
import styles from './styles.module.css';

export { default as Checkbox } from './checkbox';
export { default as Controls } from './controls';
export { default as Frame } from './frame';
export { default as FlexRow } from './flex-row';
export { default as FlexColumn } from './flex-column';
export { default as Input } from './input';
export { default as Model, withTheme, withFrame, withControls } from './model';
export { default as Play } from './play';
export { default as Radio } from './radio';
export { default as Range } from './range';
export { default as Select } from './select';
export { default as Stop } from './stop';
export { default as Step } from './step';
export { default as Timer } from './timer';
export { default as Toggle } from './toggle';
export {
  TimeSeries,
  Indicator,
  Counter,
  CounterComponent,
  IndicatorComponent,
  TimeSeriesComponent
} from './time-series';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};
