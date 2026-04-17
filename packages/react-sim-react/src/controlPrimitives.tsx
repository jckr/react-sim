import React from 'react';
import { useSimulation } from './hooks';

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid rgba(0,0,0,0.2)',
  background: '#fff',
  cursor: 'pointer',
};

export type PlayPauseButtonProps = {
  playingLabel?: string;
  pausedLabel?: string;
  disabled?: boolean;
};

export function PlayPauseButton(props: PlayPauseButtonProps) {
  const { status, play, pause } = useSimulation();
  const { playingLabel = 'Pause', pausedLabel = 'Play', disabled } = props;
  const isPlaying = status === 'playing';
  const canPlay = status === 'idle' || status === 'paused';

  return (
    <button
      type='button'
      style={btnStyle}
      onClick={isPlaying ? pause : play}
      disabled={disabled ?? (!canPlay && !isPlaying)}
    >
      {isPlaying ? playingLabel : pausedLabel}
    </button>
  );
}

export function StopButton(props: { label?: string; disabled?: boolean }) {
  const { status, stop } = useSimulation();
  const canStop = status === 'playing' || status === 'paused';

  return (
    <button
      type='button'
      style={btnStyle}
      onClick={stop}
      disabled={props.disabled ?? !canStop}
    >
      {props.label ?? 'Stop'}
    </button>
  );
}

export type StepButtonProps = {
  ticks?: number;
  label?: string;
  disabled?: boolean;
};

export function StepButton(props: StepButtonProps) {
  const { status, advance } = useSimulation();
  const ticks = props.ticks ?? 1;
  const canStep = status === 'idle' || status === 'paused';

  return (
    <button
      type='button'
      style={btnStyle}
      onClick={() => advance(ticks)}
      disabled={props.disabled ?? !canStep}
      title='Advance one or more ticks while paused'
    >
      {props.label ?? `Step${ticks > 1 ? ` (${ticks})` : ''}`}
    </button>
  );
}

export function ResetButton(props: { label?: string }) {
  const { resetWith } = useSimulation();

  return (
    <button type='button' style={btnStyle} onClick={() => resetWith()}>
      {props.label ?? 'Reset'}
    </button>
  );
}

export type TickSeekSliderProps = {
  min?: number;
  max: number;
};

export function TickSeekSlider(props: TickSeekSliderProps) {
  const { tick, status, seek } = useSimulation();
  const min = props.min ?? 0;
  const max = props.max;
  const disabled = status === 'stopped';

  if (!Number.isFinite(max)) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <input
        type='range'
        min={min}
        max={max}
        step={1}
        value={tick}
        onChange={(e) => seek(Number(e.target.value))}
        disabled={disabled}
        style={{ flex: 1 }}
      />
      <span
        style={{
          fontFamily: 'monospace',
          opacity: 0.8,
          minWidth: 48,
          textAlign: 'right',
        }}
      >
        {tick}
      </span>
    </div>
  );
}

export type ParamRangeFieldProps<Params extends Record<string, unknown>> = {
  param: Extract<keyof Params, string>;
  label?: string;
  min: number;
  max: number;
  step?: number;
};

export function ParamRangeField<
  Params extends Record<string, unknown> = Record<string, unknown>,
>(props: ParamRangeFieldProps<Params>) {
  const { params, setParams } = useSimulation<unknown, Params>();
  const label = props.label ?? props.param;
  const raw = params[props.param];
  const numericValue = Number(raw);

  return (
    <label
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <span style={{ minWidth: 120, opacity: 0.9 }}>{label}</span>
      <input
        type='range'
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={Number.isFinite(numericValue) ? numericValue : props.min}
        onChange={(e) => {
          const v = Number(e.target.value);
          setParams({ [props.param]: v } as Partial<Params>);
        }}
        style={{ flex: 1 }}
      />
      <span
        style={{
          width: 72,
          textAlign: 'right',
          fontFamily: 'monospace',
          opacity: 0.8,
        }}
      >
        {numericValue}
      </span>
    </label>
  );
}

export type ParamToggleFieldProps<Params extends Record<string, unknown>> = {
  param: Extract<keyof Params, string>;
  label?: string;
};

export function ParamToggleField<
  Params extends Record<string, unknown> = Record<string, unknown>,
>(props: ParamToggleFieldProps<Params>) {
  const { params, setParams } = useSimulation<unknown, Params>();
  const label = props.label ?? props.param;
  const checked = Boolean(params[props.param]);

  return (
    <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span style={{ minWidth: 120, opacity: 0.9 }}>{label}</span>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => {
          setParams({ [props.param]: e.target.checked } as Partial<Params>);
        }}
      />
    </label>
  );
}

export type TickReadoutProps = {
  prefix?: string;
};

export function TickReadout(props: TickReadoutProps) {
  const { tick } = useSimulation();
  return (
    <span style={{ fontFamily: 'monospace', opacity: 0.85 }}>
      {props.prefix ?? ''}tick: {tick}
    </span>
  );
}
