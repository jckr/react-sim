import React from 'react';
import {
  Model,
  CanvasFrame,
  withControls,
  withFrame,
  Range,
  Timer,
} from 'react-sim';

import { Flex, Box } from 'rebass';

export const params = {
  rule: 110,
  cols: 50,
  rows: 24,
};
export const initData = ({ cols }) => {
  const data = Array(cols).fill(0);
  data[Math.floor(data.length / 2)] = 1;
  return data;
};
export const updateData = ({ data, cols, params }) => {
  const { rule } = params;
  return data.map((cell, i) => {
    const left = data[i - 1];
    const mid = data[i];
    const right = data[i + 1];

    const bit = (left ? 4 : 0) + (mid ? 2 : 0) + (right ? 1 : 0);
    const output = rule & (1 << bit);
    // console.log(left, mid, right, bit, output})
    return output;
  });
};

export const FrameComponent = ({ data, cachedData, tick, params }) => {
  const { rows, cols } = params;
  const nbRows = Math.min(tick, params.rows);
  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        height: rows * 12,
        width: cols * 12,
      }}
    >
      <Flex direction="column" sx={{ position: 'absolute', top: 0 }}>
        {[...Array(nbRows).keys()].map(rowIndex => {
          const ts = tick - nbRows + rowIndex;
          return (
            <Flex
              direction="row"
              key={`row-${ts}`}
              sx={{ position: 'absolute', top: 12 * rowIndex }}
            >
              {cachedData[ts].map((cell, x) => (
                <Square
                  size={10}
                  color={cell ? '#000' : 'none'}
                  key={`cell-${x}`}
                />
              ))}
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};
const Frame = withFrame(FrameComponent);

const Square = ({ color, size = 12 }) => (
  <Box
    sx={{
      height: `${size}px`,
      width: `${size}px`,
      bg: color,
      m: '1px',
      border: '2px solid #000',
    }}
  />
);

const BitControlComponent = ({ bit, params, setParams }) => {
  const { rule } = params;
  const increment = 1 << bit;
  const set = increment & rule;
  const left = 4 & bit;
  const mid = 2 & bit;
  const right = 1 & bit;
  const action = () => {
    const updatedRule = set ? rule - increment : rule + increment;
    setParams({ rule: updatedRule });
  };
  return (
    <Flex
      flexDirection="column"
      onClick={action}
      alignItems="center"
      sx={{ mr: 2 }}
    >
      <Flex flexDirection="row">
        <Square color={left ? '#000' : 'none'} />
        <Square color={mid ? '#000' : 'none'} />
        <Square color={right ? '#000' : 'none'} />
      </Flex>
      <Square color={set ? '#000' : 'none'} />
    </Flex>
  );
};

const BitControl = withControls(BitControlComponent);

const Automata = () => (
  <Model
    initialParams={params}
    initData={initData}
    updateData={updateData}
    controls={{ param: 'rule', maxValue: 255, label: 'Rule' }}
  >
    <Flex flexDirection="column">
      <Frame />
      <Flex flexDirection="row" sx={{ justifyContent: 'space-between' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(bit => (
          <BitControl bit={bit} key={`bit-${bit}`} />
        ))}
      </Flex>
    </Flex>
  </Model>
);

export default Automata;
