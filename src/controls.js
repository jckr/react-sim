import React from 'react';
import {
  Checkbox,
  Input,
  Play,
  Radio,
  Range,
  Select,
  Stop,
  Timer,
  Toggle
} from './index';
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
          sx={horizontally ? { mt: 1, alignItems: 'center' } : { my: 1 }}
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
      setValue: (value) => this.props.setParams({ [paramName]: value }),
      value: params[paramName]
    };

    let control;

    switch (controls.type) {
      case 'checkbox':
        control = <Checkbox {...commonProps} {...controls} />;
        break;
      case 'input':
        control = <Input {...commonProps} {...controls} />;
        break;
      case 'radio':
        control = <Radio {...commonProps} {...controls} />;
        break;
      case 'select':
        control = <Select {...commonProps} {...controls} />;
        break;
      case 'timer':
        control = (
          <Timer
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
        control = <Toggle {...commonProps} {...controls} />;
        break;
      default:
        control = <Range {...commonProps} {...controls} />;
    }
    return <Flex mr={2}>{control}</Flex>

  }

  render() {
    const { controls } = this.props;
    return <Flex flexDirection='column'>{this.renderControls(controls)}</Flex>;
  }
}

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
