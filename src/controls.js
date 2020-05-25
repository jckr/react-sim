import React from 'react';
import { withControls } from './';
import CheckboxComponent from './checkbox';
import InputComponent from './input';
import RadioComponent from './radio';
import RangeComponent from './range';
import SelectComponent from './select';
import TimerComponent from './timer';
import ToggleComponent from './toggle';

import { Flex } from 'rebass';

export default class Controls extends React.Component {
  static defaultProps = {
    controls: null
  };
  renderControls(controls, horizontally = true) {
    if (!controls) {
      return null;
    }
    // if parameter is an array, we render a series of controls
    if (Array.isArray(controls)) {
      return controls.map((c, i) => (
        <Flex
          flexDirection={horizontally ? 'row' : 'column'}
          sx={
            horizontally
              ? { mt: 1, alignItems: 'center', flexWrap: 'wrap' }
              : { my: 1 }
          }
          key={`c-${i}`}
        >
          {/* If original parameter is a nested array, we render nested rows of columns */}
          {this.renderControls(c, !horizontally)}
        </Flex>
      ));
    }

    // parameter is a single control

    // we can do something different depending on type

    const paramName = controls.param;
    const { params } = this.props;

    const commonProps = {
      label: paramName,
      setValue: (value) => {
        this.props.setParams({ [paramName]: value }, controls.resetOnChange);
      },
      value: params[paramName]
    };

    let control;

    switch (controls.type) {
      case 'checkbox':
        control = <CheckboxComponent {...commonProps} {...controls} />;
        break;
      case 'input':
        control = <InputComponent {...commonProps} {...controls} />;
        break;
      case 'radio':
        control = <RadioComponent {...commonProps} {...controls} />;
        break;
      case 'select':
        control = <SelectComponent {...commonProps} {...controls} />;
        break;
      case 'timer':
        control = (
          <TimerComponent
            isPlaying={this.props.isPlaying}
            time={this.props.tick}
            updateTime={this.props.updateTime}
            pause={this.props.pause}
            play={this.props.play}
            stop={this.props.stop}
            {...controls}
          />
        );
        break;
      case 'toggle':
        control = <ToggleComponent {...commonProps} {...controls} />;
        break;
      default:
        control = <RangeComponent {...commonProps} {...controls} />;
    }
    return <Flex mr={2}>{control}</Flex>;
  }

  render() {
    const { controls } = this.props;
    return <Flex flexDirection='column'>{this.renderControls(controls)}</Flex>;
  }
}

export const Checkbox = withControls(CheckboxComponent);
export const Input = withControls(InputComponent);
export const Radio = withControls(RadioComponent);
export const Range = withControls(RangeComponent);
export const Select = withControls(SelectComponent);
export const Timer = withControls(TimerComponent);
export const Toggle = withControls(ToggleComponent);

export function hasTimer(controls) {
  // no controls
  if (!controls) {
    return false;
  }

  // array of controls (rows or columns of controls)
  if (Array.isArray(controls)) {
    // if this is true for one of the children, returns true.
    return controls.some((c) => hasTimer(c));
  }

  // single object
  return controls.type === 'timer';
}
