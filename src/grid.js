import React from 'react';
import { Flex, Box } from './ui';
import { withFrame } from './';

export function GridComponent({
  data,
  size = 12,
  accessor = (d) => (d ? '#000' : 'none'),
  ...props
}) {
  return (
    <Flex flexDirection="column" {...props}>
      {data.map((row, y) => (
        <Flex flexDirection="row" key={`r-${y}`} sx={{ height: [size] }}>
          {row.map((cell, x) => (
            <Box
              key={`c-${x}`}
              {...props}
              sx={{
                ...(props?.sx || {}),
                width: [size],
                bg: accessor(cell, x, y)
              }}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
}

const Grid = withFrame(GridComponent);

export default Grid;
