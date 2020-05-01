import React from "react";
import { Flex, Text } from "rebass";
import { Label, Slider } from "@rebass/forms";
export default class Play extends React.Component {
  static defaultProps = {
    minValue: 0,
    maxValue: 100,
    shouldDisplayLabel: true,
    shouldDisplayMaxValue: true,
    shouldDisplayMinValue: true,
    shouldDisplayValue: true,
    step: 1
  };

  render() {
    const {
      label,
      maxValue,
      minValue,
      setValue,
      shouldDisplayLabel,
      shouldDisplayMaxValue,
      shouldDisplayMinValue,
      shouldDisplayValue,
      step,
      value
    } = this.props;

    const LabelRow =
      (label !== undefined || value !== undefined) &&
      (shouldDisplayLabel || shouldDisplayValue) ? (
        <Label htmlFor={label}>
          {shouldDisplayLabel && `${label}: `}
          {shouldDisplayValue && value}
        </Label>
      ) : null;

    const ControlRow = maxValue && maxValue < Infinity && (
      <Flex flexDirection="row" alignItems="center" sx={{width: [200]}}>
        {shouldDisplayMinValue && <Text>{minValue}</Text>}
        <Slider
          id={label}
          sx={{
            mx: 2
          }}
          max={maxValue}
          min={minValue}
          onChange={e => {
            setValue(e.target.value)
          }}
          step={step}
          value={value}
        />
        {shouldDisplayMaxValue && <Text>{maxValue}</Text>}
      </Flex>
    );

    return (
      <Flex flexDirection="column">
        {LabelRow}
        {ControlRow}
      </Flex>
    );
  }
}
