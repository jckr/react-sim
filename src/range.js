import React from 'react';
import { Flex, Text } from './ui';

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

    const id = name || label;
    const LabelRow =
      (label !== undefined || value !== undefined) &&
      (shouldDisplayLabel || shouldDisplayValue) ? (
        <label htmlFor={id} style={{ display: 'block', marginBottom: 4 }}>
          {shouldDisplayLabel && label && `${label}: `}
          {shouldDisplayValue && value}
        </label>
      ) : null;

    const ControlRow =
      shouldDisplaySlider && maxValue !== undefined && maxValue < Infinity ? (
        <Flex
          flexDirection="row"
          alignItems="center"
          sx={{ width: [158] }}
        >
          {shouldDisplayMinValue && (
            <Text
              sx={{
                color: 'gray',
                cursor: 'pointer',
                fontSize: 1,
                userSelect: 'none',
                width: 'max-content'
              }}
              onClick={() => setValue(Math.max(minValue, value - step))}
            >
              {minValue}
            </Text>
          )}
          <input
            id={id}
            name={id}
            type="range"
            style={{ flex: 1, margin: '0 8px' }}
            max={maxValue}
            min={minValue}
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
            step={step}
            value={value}
          />
          {shouldDisplayMaxValue && (
            <Text
              sx={{
                color: 'gray',
                cursor: 'pointer',
                fontSize: 1,
                userSelect: 'none',
                width: 'max-content',
                minWidth: [40]
              }}
              onClick={() => setValue(Math.min(maxValue, value + step))}
            >
              {maxValue}
            </Text>
          )}
        </Flex>
      ) : null;

    return (
      <Flex flexDirection="column">
        {LabelRow}
        {ControlRow}
      </Flex>
    );
  }
}
