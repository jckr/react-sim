import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulationContext } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import type { Automata1dData, Automata1dParams, FirstLineMode } from '../sims/automata1dSim';
import { initData, updateData } from '../sims/automata1dSim';

const CELL = 8;

function AutomataBitToggle(props: { bit: number }) {
  const { params, setParams } = useSimulationContext<Automata1dData, Automata1dParams, unknown>();
  const increment = 1 << props.bit;
  const set = (increment & params.rule) !== 0;
  const left = (4 & props.bit) !== 0;
  const mid = (2 & props.bit) !== 0;
  const right = (1 & props.bit) !== 0;

  return (
    <button
      type="button"
      onClick={() => {
        const updatedRule = set ? params.rule - increment : params.rule + increment;
        setParams({ rule: updatedRule });
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        marginRight: 12,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 4
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <div
          style={{
            width: CELL,
            height: CELL,
            background: left ? '#111' : 'transparent',
            border: '2px solid #000',
            boxSizing: 'border-box'
          }}
        />
        <div
          style={{
            width: CELL,
            height: CELL,
            background: mid ? '#111' : 'transparent',
            border: '2px solid #000',
            boxSizing: 'border-box'
          }}
        />
        <div
          style={{
            width: CELL,
            height: CELL,
            background: right ? '#111' : 'transparent',
            border: '2px solid #000',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <div
        style={{
          width: CELL,
          height: CELL,
          background: set ? '#111' : 'transparent',
          border: '2px solid #000',
          boxSizing: 'border-box'
        }}
      />
    </button>
  );
}

function Automata1dInner() {
  const { cachedData, tick, params, setParams } = useSimulationContext<Automata1dData, Automata1dParams, unknown>();
  const { rows, cols } = params;
  const nbRows = Math.min(tick, rows);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <StandardControls
        maxTime={500}
        minTime={0}
        showStepButton
        controls={[
          {
            type: 'range',
            param: 'rule',
            label: 'Rule',
            minValue: 0,
            maxValue: 255,
            step: 1
          }
        ]}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
        First line
        <select
          value={params.firstLine}
          onChange={(e) => {
            const firstLine = e.target.value as FirstLineMode;
            setParams({ firstLine }, { reset: true });
          }}
          style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.2)' }}
        >
          <option value="blank">blank (center dot)</option>
          <option value="full">full</option>
          <option value="random">random</option>
        </select>
      </label>

      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: rows * (CELL + 2),
          width: cols * (CELL + 2),
          margin: '0 auto',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 8
        }}
      >
        {[...Array(nbRows).keys()].map((rowIndex) => {
          const ts = tick - nbRows + rowIndex;
          const row = cachedData[ts] as Automata1dData | undefined;
          if (!row) return null;
          return (
            <div
              key={`row-${ts}`}
              style={{
                position: 'absolute',
                top: (CELL + 2) * rowIndex,
                left: 0,
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              {row.map((cell, x) => (
                <div
                  key={`c-${ts}-${x}`}
                  style={{
                    height: CELL,
                    width: CELL,
                    margin: 1,
                    border: '2px solid #000',
                    boxSizing: 'border-box',
                    background: cell ? '#000' : 'transparent'
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 13, color: '#555' }}>
        Rule bits (tap to toggle). Top row: neighborhood pattern; bottom: whether that pattern turns the cell on.
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {[0, 1, 2, 3].map((bit) => (
          <AutomataBitToggle key={bit} bit={bit} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {[4, 5, 6, 7].map((bit) => (
          <AutomataBitToggle key={bit} bit={bit} />
        ))}
      </div>
    </div>
  );
}

export function Automata1dDemo() {
  return (
    <Simulation<Automata1dData, Automata1dParams, unknown>
      initData={initData}
      updateData={updateData}
      config={{
        initialParams: {
          rule: 110,
          cols: 33,
          rows: 24,
          firstLine: 'blank'
        },
        minTime: 0,
        maxTime: 500,
        delayMs: 40,
        ticksPerAnimation: 1,
        loop: false,
        noCache: false
      }}
    >
      <Automata1dInner />
    </Simulation>
  );
}
