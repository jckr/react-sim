import React from 'react';
import {Flex, Box} from 'rebass';

const Grid = (
  { data, size = 12, accessor = d => (d ? '#000' : 'none') },
  cellProps = {},
  ...props
) => (
  <Flex flexDirection="column" {...props}>
    {data.map((row, y) => (
      <Flex flexDirection="row" key={`r-${y}`} sx={{ height: [size] }}>
        {row.map((cell, x) => (
          <Box
            key={`c-${x}`}
            {...props}
            sx={{
              ...(props ? props.sx : {}),
              width: [size],
              bg: accessor(cell),
            }}
          />
        ))}
      </Flex>
    ))}
  </Flex>
);

export default Grid;
