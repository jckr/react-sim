import React from 'react';
import { useSimulationContext } from './hooks';

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid rgba(0,0,0,0.2)',
  background: '#fff',
  cursor: 'pointer'
};

export type PlayPauseButtonProps = {
  /** Override label; default follows isPlaying */
  playingLabel?: string;
  pausedLabel?: string;
  disabled?: boolean;
};

export function PlayPauseButton(props: PlayPauseButtonProps) {
  const { isPlaying, canPlay, play, pause } = useSimulationContext();
  const { playingLabel = 'Pause', pausedLabel = 'Play', disabled } = props;
  return (
    <button
      type="button"
      style={btnStyle}
      onClick={isPlaying ? pause : play}
      disabled={disabled ?? (!canPlay && !isPlaying)}
    >
      {isPlaying ? playingLabel : pausedLabel}
    </button>
  );
}

export function StopButton(props: { label?: string }) {
  const { stop } = useSimulationContext();
  return (
    <button type="button" style={btnStyle} onClick={stop}>
      {props.label ?? 'Stop'}
    </button>
  );
}

export type StepButtonProps = {
  /** How many ticks to advance (default 1). */
  ticks?: number;
  label?: string;
  disabled?: boolean;
};

export function StepButton(props: StepButtonProps) {
  const { stepOnce, canPlay, isPlaying } = useSimulationContext();
  const ticks = props.ticks ?? 1;
  return (
    <button
      type="button"
      style={btnStyle}
      onClick={() => stepOnce(ticks)}
      disabled={props.disabled ?? (!canPlay || isPlaying)}
      title="Advance one or more ticks while paused (pause playback first)"
    >
      {props.label ?? `Step${ticks > 1 ? ` (${ticks})` : ''}`}
    </button>
  );
}

export type TickSeekSliderProps = {
  minTime?: number;
  maxTime: number;
};

export function TickSeekSlider(props: TickSeekSliderProps) {
  const { tick, seek } = useSimulationContext();
  const min = props.minTime ?? 0;
  const max = props.maxTime;
  if (!Number.isFinite(max)) return null;

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={tick}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ flex: 1 }}
      />
      <span style={{ fontFamily: 'monospace', opacity: 0.8, minWidth: 48, textAlign: 'right' }}>{tick}</span>
    </div>
  );
}

export type ParamRangeFieldProps<Params extends Record<string, unknown>> = {
  param: Extract<keyof Params, string>;
  label?: string;
  minValue: number;
  maxValue: number;
  step?: number;
  /** If true, re-runs initData when the value changes (same as engine setParams reset). */
  resetOnChange?: boolean;
};

export function ParamRangeField<Params extends Record<string, unknown>>(props: ParamRangeFieldProps<Params>) {
  const { params, setParams } = useSimulationContext<unknown, Params, unknown>();
  const label = props.label ?? props.param;
  const raw = params[props.param];
  const numericValue = Number(raw);

  return (
    <label style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
      <span style={{ minWidth: 120, opacity: 0.9 }}>{label}</span>
      <input
        type="range"
        min={props.minValue}
        max={props.maxValue}
        step={props.step ?? 1}
        value={Number.isFinite(numericValue) ? numericValue : props.minValue}
        onChange={(e) => {
          const v = Number(e.target.value);
          const patch: Partial<Params> = { [props.param]: v } as Partial<Params>;
          setParams(patch, { reset: props.resetOnChange });
        }}
        style={{ flex: 1 }}
      />
      <span style={{ width: 72, textAlign: 'right', fontFamily: 'monospace', opacity: 0.8 }}>
        {numericValue}
      </span>
    </label>
  );
}

export type ParamToggleFieldProps<Params extends Record<string, unknown>> = {
  param: Extract<keyof Params, string>;
  label?: string;
  resetOnChange?: boolean;
};

export function ParamToggleField<Params extends Record<string, unknown>>(props: ParamToggleFieldProps<Params>) {
  const { params, setParams } = useSimulationContext<unknown, Params, unknown>();
  const label = props.label ?? props.param;
  const checked = Boolean(params[props.param]);

  return (
    <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span style={{ minWidth: 120, opacity: 0.9 }}>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          const patch: Partial<Params> = { [props.param]: e.target.checked } as Partial<Params>;
          setParams(patch, { reset: props.resetOnChange });
        }}
      />
    </label>
  );
}

export type TickReadoutProps = {
  prefix?: string;
};

export function TickReadout(props: TickReadoutProps) {
  const { tick } = useSimulationContext();
  return (
    <span style={{ fontFamily: 'monospace', opacity: 0.85 }}>
      {props.prefix ?? ''}tick: {tick}
    </span>
  );
}
