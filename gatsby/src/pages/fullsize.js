import React from 'react';

import Automata from '../components/examples/1d-automata';
import Activators from '../components/examples/activators';
import Boids from '../components/examples/boids';
import ChaosGame from '../components/examples/chaos-game';
import Dice from '../components/examples/dice';
import Epidemic from '../components/examples/epidemic';
import Fibonacci from '../components/examples/fibonacci';
import GameOfLife from '../components/examples/game-of-life';
import Maze from '../components/examples/mazes';
import Percolation from '../components/examples/percolation';
import Segregation from '../components/examples/segregation';
import SimpleModel from '../components/examples/simple-model';

const extraProps = {
  delay: 500,
  fmOverrides: {
    sx: {
      border: 'none',
      my: 0,
      p: 0,
      width: '332px',
    },
  },
  noControls: true,
  isPlaying: true,
  maxTime: 50,
  onAnimate: ({ tick }) => console.log(tick),
};

const Page = props => {
  const example = props.location.search.slice(1);
  switch (example) {
    case 'activators':
      return <Activators {...extraProps} maxTime={30} />;
    case 'automata':
      return (
        <Automata
          {...extraProps}
          maxTime={65}
          initialParams={{ rule: 110, cols: 33, rows: 33, firstLine: 'random' }}
        />
      );
    case 'boids':
      return <Boids {...extraProps} maxTime={200} />;
    case 'chaos-game':
      return <ChaosGame {...extraProps} maxTime={5000} />;
    case 'dice':
      return <Dice {...extraProps} />;
    case 'epidemic':
      return <Epidemic {...extraProps} hideSeries maxTime={100} />;
    case 'fibonacci':
      return <Fibonacci {...extraProps} maxTime={15} />;
    case 'game-of-life':
      return <GameOfLife {...extraProps} />;
    case 'maze':
      return (
        <Maze
          {...extraProps}
          extraParams={{ grid: 'circle', ticksPerAnimation: 5 }}
        />
      );
    case 'percolation':
      return (
        <Percolation
          {...extraProps}
          initialParams={{
            width: 16,
            height: 16,
            cellSize: 20.75,
            margin: 0,
            porosity: 0.65,
            shouldComplete: false,
          }}
        />
      );
    case 'segregation':
      return <Segregation {...extraProps} extraParams={{ tolerance: 50 }} />;
    case 'simple-model':
      return <SimpleModel {...extraProps} maxTime={100} />;
    default:
      return <div>Usage: have an example name in the search query.</div>;
  }
};

export default Page;
