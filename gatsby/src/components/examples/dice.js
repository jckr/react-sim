import React from 'react';
import { useThemeUI } from 'theme-ui';
import { Flex } from 'rebass';

import { FitContentModel as Model } from './framed-model';

// helpers

const roll = random => Math.ceil(random() * 6);

export function updateDice(
  { data, tick, params: { nbDice } },
  random = Math.random
) {
  const lastTotals = data.totals;

  // we roll the dice...
  let total = 0;
  const rolls = [];
  for (let i = 0; i < nbDice; i++) {
    rolls.push(roll(random));
    total += rolls[i];
  }

  // and update the totals
  const updatedTotals = {
    ...lastTotals,
    [total]: (lastTotals[total] || 0) + 1,
  };

  const average = (data.average * (tick - 1) + data.total) / tick;

  return { rolls, average, total, totals: updatedTotals };
}

export function initDice({ nbDice }) {
  return {
    rolls: [],
    average: 3.5 * nbDice,
    total: 0,
    totals: {},
  };
}

export const Die = ({ value }) => {
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
    <Flex flexDirection="column">
      <Flex
        flexDirection="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          width,
          height: '50px',
        }}
      >
        <div style={{ width: width * 0.8, height, backgroundColor: color }} />
      </Flex>
      <Flex
        flexDirection="row"
        sx={{
          justifyContent: 'center',
          fontSize: `${Math.min((500 / 2) * nbValues, 12)}px`,
        }}
      >
        {label}
      </Flex>
    </Flex>
  );
};

export class DiceFrame extends React.Component {
  render() {
    if (this.props.data === null) {
      return null;
    }
    const {
      data,
      params: { nbDice },
      theme,
    } = this.props;

    const minValue = Number(nbDice);
    const maxValue = minValue * 6;
    const nbValues = maxValue - minValue + 1;

    const { rolls, totals } = data;
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
      <Flex
        flexDirection="column"
        sx={{ justifyContent: 'space-between', height: '140px' }}
      >
        <Flex flexDirection="row">
          {rolls.map((value, index) => (
            <Die value={value} key={`k-${index}`} />
          ))}
        </Flex>
        <Flex
          flexDirection="row"
          sx={{ alignItems: 'flex-end', height: '80px' }}
        >
          {bars.map(bar => (
            <Bar
              {...bar}
              key={bar.label}
              max={max}
              nbValues={nbValues}
              theme={theme}
            />
          ))}
        </Flex>
      </Flex>
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
          resetOnChange: true,
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
