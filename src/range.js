import React from 'react';
import { Flex, Text } from 'rebass';
import { Label, Slider } from '@rebass/forms';
export default class Play extends React.Component {
  static defaultProps = {
    minValue: 0,
    maxValue: 100,
    shouldDisplayLabel: true,
    shouldDisplayMaxValue: true,
    shouldDisplayMinValue: true,
    shouldDisplayValue: true,
    shouldDisplaySlider: true,
    step: 1
  };

  render() {
    const {
      label,
      name,
      maxValue,
      minValue,
      setValue,
      shouldDisplayLabel,
      shouldDisplayMaxValue,
      shouldDisplayMinValue,
      shouldDisplayValue,
      shouldDisplaySlider,
      step,
      value
    } = this.props;

    const LabelRow =
      (label !== undefined || value !== undefined) &&
      (shouldDisplayLabel || shouldDisplayValue) ? (
        <Label htmlFor={name || label}>
          {shouldDisplayLabel && label && `${label}: `}
          {shouldDisplayValue && value}
        </Label>
      ) : null;

    const ControlRow = shouldDisplaySlider &&
      maxValue !== undefined &&
      maxValue < Infinity && (
        <Flex flexDirection='row' alignItems='center' sx={{ width: [200] }}>
          {shouldDisplayMinValue && <Text sx={{fontSize: 1, color: 'gray', width: 'max-content'}}>{minValue}</Text>}
          <Slider
            id={name || label}
            name={name || label}
            sx={{
              mx: 2
            }}
            max={maxValue}
            min={minValue}
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
            step={step}
            value={value}
          />
          {shouldDisplayMaxValue && <Text sx={{fontSize: 1, color: 'gray', width: 'max-content', minWidth: [40]}}>{maxValue}</Text>}
        </Flex>
      );

    return (
      <Flex flexDirection='column'>
        {LabelRow}
        {ControlRow}
      </Flex>
    );
  }
}
