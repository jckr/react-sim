import React from 'react';
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Model } from 'react-sim';

import {
  GameOfLifeFrame,
  updateGameOfLifeGrid,
} from '../components/examples/game-of-life';

const reactsim = `0000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000
0011110011111001110001110011111000000111001110100000100
0010001010000010001010001000100000001000100100110001100
0010001010000010001010001000100000001000100100101010100
0010001010000010001010000000100000001000000100100100100
0011110011110010001010000000100011100111000100100000100
0010001010000011111010000000100000000000100100100000100
0010001010000010001010001000100000001000100100100000100
0010001010000010001010001000100000001000100100100000100
0010001011111010001001110000100000000111001110100000100
0000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000`
  .split('\n')
  .map(row => row.split('').map(Number));

function initData({ height, width }) {
  const grid = Array(height)
    .fill(0)
    .map(r =>
      Array(width)
        .fill(0)
        .map(d => (Math.random() > 0.8 ? 1 : 0))
    );
  const y = Math.floor((height - reactsim.length) / 2);
  const x = Math.floor((width - reactsim[0].length) / 2);
  reactsim.forEach((r, rowIndex) =>
    r.forEach((c, colIndex) => {
      if (grid[y + rowIndex]) {
        grid[y + rowIndex][x + colIndex] = c;
      }
    })
  );
  return grid;
}

const HomePage = () => {
  return (
    <div>
      <Model
        start={false}
        updateData={updateGameOfLifeGrid}
        maxTime={Infinity}
        initData={initData}
        initialParams={{
          height: 60,
          width: 80,
        }}
      >
        <GameOfLifeFrame />
      </Model>

      <Link to="/about">Get Started</Link>
    </div>
  );
};

export default HomePage;
