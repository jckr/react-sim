import React from 'react';
import {
  ParamRangeField,
  ParamToggleField,
  PlayPauseButton,
  StopButton,
  StepButton,
  TickReadout,
  TickSeekSlider
} from './controlPrimitives';

export type ParamRangeControl = {
  type?: 'range';
  param: string;
  label?: string;
  minValue: number;
  maxValue: number;
  step?: number;
  resetOnChange?: boolean;
};

export type ParamToggleControl = {
  type: 'toggle';
  param: string;
  label?: string;
  resetOnChange?: boolean;
};

export type ParamControl = ParamRangeControl | ParamToggleControl;

export type StandardControlsProps = {
  controls?: ParamControl | ParamControl[] | null;
  /** If set and finite, shows a tick seek slider */
  maxTime?: number;
  minTime?: number;
  /** Show advance-one-tick button (composable alternative: import `StepButton`) */
  showStepButton?: boolean;
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
  borderRadius: 8
};

/**
 * Batteries-included control strip: play/pause, stop, optional step, tick readout,
 * optional seek slider, and optional param fields from config.
 * For full composition, use `PlayPauseButton`, `StepButton`, etc. from `controlPrimitives`.
 */
export function StandardControls(props: StandardControlsProps) {
  const controls = asArray(props.controls);
  const maxTime = props.maxTime;
  const canSeek = maxTime !== undefined && Number.isFinite(maxTime);

  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <PlayPauseButton />
        <StopButton />
        {props.showStepButton ? <StepButton /> : null}
        <TickReadout />
      </div>

      {canSeek ? <TickSeekSlider minTime={props.minTime} maxTime={maxTime as number} /> : null}

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
                  resetOnChange={c.resetOnChange}
                />
              );
            }
            return (
              <ParamRangeField<Record<string, unknown>>
                key={key}
                param={c.param}
                label={c.label}
                minValue={c.minValue}
                maxValue={c.maxValue}
                step={c.step}
                resetOnChange={c.resetOnChange}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use `StandardControls` */
export const SimulationControls = StandardControls;
