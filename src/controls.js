import React from 'react';
import {
  Checkbox,
  FlexRow,
  FlexColumn,
  Input,
  Play,
  Radio,
  Range,
  Select,
  Stop,
  Timer,
  Toggle
} from './index';

export default class Controls extends React.Component {
  static defaultProps = {
    controls: null
  };
  renderControls(controls, horizontally = false) {
    if (!controls) {
      return null;
    }
    // if parameter is an array, we render a series of controls
    const Block = horizontally ? FlexColumn : FlexRow;
    if (Array.isArray(controls)) {
      return controls.map((c, i) => (
        <Block
          styles={{ margin: horizontally ? '0 10px 0 0' : '10px 0' }}
          key={`c-${i}`}
        >
          {/* If original parameter is a nested array, we render nested rows of columns */}
          {this.renderControls(c, !horizontally)}
        </Block>
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

    switch (controls.type) {
      case 'checkbox':
        return <Checkbox {...commonProps} {...controls} />;
      case 'input':
        return <Input {...commonProps} {...controls} />;
      case 'radio':
        return <Radio {...commonProps} {...controls} />;
      case 'select':
        return <Select {...commonProps} {...controls} />;
      case 'timer':
        return <Timer {...controls} />;
      case 'toggle':
        return <Toggle {...commonProps} {...controls} />;
      default:
        return <Range {...commonProps} {...controls} />;
    }
  }

  render() {
    const { controls } = this.props;
    return <FlexColumn>{this.renderControls(controls)}</FlexColumn>;
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
