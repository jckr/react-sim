import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import diceSim from '../sims/diceSim';
import type { DiceData, DiceParams } from '../sims/diceSim';

function Die(props: { value: number }) {
  const dotStyle: React.CSSProperties = {
    background: '#000',
    width: 3,
    height: 3,
    borderRadius: '100%',
    position: 'absolute'
  };
  const top = { top: 3 };
  const bottom = { bottom: 3 };
  const right = { right: 3 };
  const left = { left: 3 };
  const mid = { top: 8 };
  const center = { left: 8 };
  const { value } = props;
  return (
    <div
      style={{
        width: 21,
        height: 21,
        marginRight: 10,
        position: 'relative',
        border: '1px solid #000',
        borderRadius: 3
      }}
    >
      {value !== 1 && <div style={{ ...dotStyle, ...top, ...left }} />}
      {value > 3 && <div style={{ ...dotStyle, ...top, ...right }} />}
      {value === 6 && <div style={{ ...dotStyle, ...mid, ...left }} />}
      {value % 2 === 1 && <div style={{ ...dotStyle, ...mid, ...center }} />}
      {value === 6 && <div style={{ ...dotStyle, ...mid, ...right }} />}
      {value > 3 && <div style={{ ...dotStyle, ...bottom, ...left }} />}
      {value !== 1 && <div style={{ ...dotStyle, ...bottom, ...right }} />}
    </div>
  );
}

function Bar(props: { label: number; nbRolls: number; max: number; nbValues: number }) {
  const height = props.max ? (50 * props.nbRolls) / props.max : 0;
  const width = 350 / props.nbValues;
  const color = '#3355ff';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', height: 50 }}>
        <div style={{ width: width * 0.8, height, backgroundColor: color }} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: Math.min(350 / (1.5 * props.nbValues), 12)
        }}
      >
        {props.label}
      </div>
    </div>
  );
}

function DiceDemoInner() {
  const { data, params } = useSimulation<typeof diceSim>();
  const minValue = Number(params.nbDice);
  const maxValue = minValue * 6;
  const nbValues = maxValue - minValue + 1;

  const { rolls, totals } = data;
  let max = 0;
  const bars = Array.from({ length: nbValues }, (_, i) => {
    const label = minValue + i;
    const nbRolls = totals[label] ?? 0;
    max = Math.max(max, nbRolls);
    return { label, nbRolls };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <StandardControls
        maxTime={1000}
        showStepButton
        controls={{
          type: 'range',
          param: 'nbDice',
          label: 'Dice per roll',
          min: 1,
          max: 6,
          step: 1,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 140,
          gap: 12
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {rolls.map((value, index) => (
            <Die key={`die-${index}-${value}`} value={value} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', minHeight: 80 }}>
          {bars.map((bar) => (
            <Bar key={bar.label} label={bar.label} nbRolls={bar.nbRolls} max={max} nbValues={nbValues} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DiceDemo() {
  return (
    <Simulation
      sim={diceSim}
      maxTime={1000}
      delayMs={0}
    >
      <DiceDemoInner />
    </Simulation>
  );
}
