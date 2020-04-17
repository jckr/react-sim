import React from "react";
import { FlexColumn, FlexRow } from "./";

export default class Play extends React.Component {
  static defaultProps = {
    minValue: 0,
    maxValue: 100,
    shouldDisplayLabel: true,
    shouldDisplayMaxValue: true,
    shouldDisplayMinValue: true,
    shouldDisplayValue: true,
    step: 1,
    styles: {}
  };

  render() {
    const styles = {
      display: "flex",
      borderRadius: "3px",
      justifyContent: "center",
      alignItems: "center",

      ...this.props.styles
    };

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
        <FlexRow>
          {shouldDisplayLabel && `${label}: `}
          {shouldDisplayValue && value}
        </FlexRow>
      ) : null;

    const ControlRow = maxValue && maxValue < Infinity && (
      <FlexRow>
        {shouldDisplayMinValue && <div>{minValue}</div>}
        <input
          type="range"
          style={styles}
          max={maxValue}
          min={minValue}
          onChange={e => setValue(e.target.value)}
          step={step}
          value={value}
        />
        {shouldDisplayMaxValue && <div>{maxValue}</div>}
      </FlexRow>
    );

    return <FlexColumn>{LabelRow}{ControlRow}</FlexColumn>;
  }
}
