import React from 'react';
import {
  Play,
  FlexRow,
  FlexColumn,
  Model,
  withTheme,
} from 'react-sim';
import { useThemeUI } from 'theme-ui';
// helpers

const roll = () => Math.ceil(Math.random() * 6);

export function updateDice({ data, tick, params: { nbDice } }) {
  // if the user went back in time, we don't update the dataset
  if (data[tick]) {
    return data;
  }

  // else, we add new data points.

  // in the standard case, the user just went forward by one tick.
  // but if they went forward by many, we'll have to add that many
  // datapoints.

  let lastTickWithoutData = tick;
  while (lastTickWithoutData > 0 && !data[lastTickWithoutData]) {
    lastTickWithoutData--;
  }

  for (let i = lastTickWithoutData; i < tick; i++) {
    const lastTotals = data[data.length - 1].totals;

    // we roll the dice...
    let total = 0;
    const rolls = [];
    for (let i = 0; i < nbDice; i++) {
      rolls.push(roll());
      total += rolls[i];
    }

    // and update the totals
    const updatedTotals = {
      ...lastTotals,
      [total]: (lastTotals[total] || 0) + 1,
    };

    // then we append our data point to data
    data.push({ rolls, totals: updatedTotals });
  }

  // and return it to update the property.
  return data;
}

function initDice() {
  return [
    {
      rolls: [],
      totals: {},
    },
  ];
}

const Die = ({ value }) => {
  const dotStyle = {
    background: '#000',
    width: 3,
    height: 3,
    borderRadius: '100%',
    position: 'absolute',
  };
  const top = { top: 3 };
  const bottom = { bottom: 3 };
  const right = { right: 3 };
  const left = { left: 3 };
  const mid = { top: 8 };
  const center = { left: 8 };
  return (
    <div
      style={{
        width: 21,
        height: 21,
        marginRight: 10,
        position: 'relative',
        border: '1px solid #000',
        borderRadius: '3px',
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
};

const Bar = ({ label, max, nbRolls, nbValues, theme }) => {
  const height = max ? (50 * nbRolls) / max : 0;
  const width = 500 / nbValues;
  const color = theme?.colors?.primary || '#33f';

  return (
    <FlexColumn>
      <FlexRow
        styles={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          width,
          height: 50,
        }}
      >
        <div style={{ width: width * 0.8, height, backgroundColor: color }} />
      </FlexRow>
      <FlexRow
        styles={{
          justifyContent: 'center',
          fontSize: Math.min((500 / 2) * nbValues, 12),
        }}
      >
        {label}
      </FlexRow>
    </FlexColumn>
  );
};

export class DiceFrame extends React.Component {
  render() {
    if (this.props.data === null) {
      return null;
    }
    const {
      data,
      tick,
      params: { nbDice },
      theme,
    } = this.props;

    const minValue = Number(nbDice);
    const maxValue = minValue * 6;
    const nbValues = maxValue - minValue + 1;

    const lastDataPoint = data[tick] || { rolls: [], totals: {} };

    const { rolls, totals } = lastDataPoint;
    let max = 0;
    const bars = Array(nbValues)
      .fill(0)
      .map((d, i) => {
        const label = minValue + i;
        const nbRolls = totals[label] || 0;
        max = Math.max(max, nbRolls);
        return { label, nbRolls };
      });

    return (
      <div>
        <FlexColumn
          styles={{ justifyContent: 'space-between', height: '140px' }}
        >
          <FlexRow>
            {rolls.map((value, index) => (
              <Die value={value} key={`k-${index}`} />
            ))}
          </FlexRow>
          <FlexRow styles={{ alignItems: 'flex-end', height: '80px' }}>
            {bars.map(bar => (
              <Bar
                {...bar}
                key={bar.label}
                max={max}
                nbValues={nbValues}
                theme={theme}
              />
            ))}
          </FlexRow>
        </FlexColumn>
        <div
          style={{
            cursor: 'pointer',
            background: '#eee',
            padding: '8px',
            margin: '8px 8px 8px 0',
            width: 'fit-content',
          }}
          onClick={this.props.initData}
        >
          Reset sim
        </div>
      </div>
    );
  }
}

const Dice = () => {
  const context = useThemeUI();
  const { theme } = context;
  return (
    <>
      <Model
        theme={theme}
        auto={false}
        controls={{
          param: 'nbDice',
          minValue: 1,
          maxValue: 6,
          label: 'Number of dice per roll',
        }}
        updateData={updateDice}
        maxTime={1000}
        initData={initDice}
        initialParams={{
          nbDice: 5,
        }}
      >
        <DiceFrame theme={theme} />
      </Model>
    </>
  );
};

export default Dice;
