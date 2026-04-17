import React from 'react';
import {
  ParamRangeField,
  ParamToggleField,
  PlayPauseButton,
  StopButton,
  StepButton,
  ResetButton,
  TickReadout,
  TickSeekSlider,
} from './controlPrimitives';

export type ParamRangeControl = {
  type?: 'range';
  param: string;
  label?: string;
  min: number;
  max: number;
  step?: number;
};

export type ParamToggleControl = {
  type: 'toggle';
  param: string;
  label?: string;
};

export type ParamControl = ParamRangeControl | ParamToggleControl;

export type StandardControlsProps = {
  controls?: ParamControl | ParamControl[] | null;
  maxTime?: number;
  minTime?: number;
  showStepButton?: boolean;
  /** Show the stop button. Default false — stop puts the sim in a dead-end state. */
  showStopButton?: boolean;
  /** Show the reset button. Default true. */
  showResetButton?: boolean;
};

function asArray<T>(maybeArray: T | T[] | null | undefined): T[] {
  if (!maybeArray) return [];
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

const panelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  padding: 12,
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: 8,
};

/**
 * Batteries-included control strip: play/pause, stop, optional step/reset,
 * tick readout, optional seek slider, and optional param fields.
 */
export function StandardControls(props: StandardControlsProps) {
  const controls = asArray(props.controls);
  const maxTime = props.maxTime;
  const canSeek = maxTime !== undefined && Number.isFinite(maxTime);

  return (
    <div style={panelStyle}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <PlayPauseButton />
        {props.showStopButton ? <StopButton /> : null}
        {props.showStepButton ? <StepButton /> : null}
        {props.showResetButton !== false ? <ResetButton /> : null}
        <TickReadout />
      </div>

      {canSeek ? (
        <TickSeekSlider min={props.minTime} max={maxTime} />
      ) : null}

      {controls.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {controls.map((c) => {
            const key = `${c.type ?? 'range'}-${c.param}`;
            if (c.type === 'toggle') {
              return (
                <ParamToggleField<Record<string, unknown>>
                  key={key}
                  param={c.param}
                  label={c.label}
                />
              );
            }
            return (
              <ParamRangeField<Record<string, unknown>>
                key={key}
                param={c.param}
                label={c.label}
                min={c.min}
                max={c.max}
                step={c.step}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
