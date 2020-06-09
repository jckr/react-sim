import React from 'react';
import { Flex } from 'rebass';
import { TimeSeries, Counter, withFrame } from 'react-sim';

import Model from './framed-model';

const COLORS = {
  sick: '#4f8c9d',
  recovered: '#add51f',
  healthy: '#997cfb',
  dead: '#6a9012',
};

export function updateEpidemic(
  { data, tick, params, complete },
  random = Math.random
) {
  let updatedData = JSON.parse(JSON.stringify(data.agents));
  let nbSick = 0,
    nbHealthy = 0,
    nbDead = 0,
    nbRecovered = 0;

  const {
    contaminationRisk,
    deathRisk,
    r,
    recoveryTicks,
    height,
    width,
  } = params;

  updatedData.forEach((agent, i) => {
    // update status

    if (agent.status === 'sick') {
      if (tick >= agent.recovery) {
        agent.status = 'recovered';
      } else {
        if (random() < deathRisk) {
          agent.status = 'dead';
        }
      }
    }
    if (agent.status !== 'dead') {
      // checking for collisions

      for (let j = i + 1; j < updatedData.length; j++) {
        let otherAgent = updatedData[j];
        const dx = otherAgent.x - agent.x;
        const dy = otherAgent.y - agent.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 2 * r) {
          // collision

          const ax = dx / distance;
          const ay = dy / distance;

          agent.vx = agent.vx - ax;
          agent.vy = agent.vy - ay;
          otherAgent.vx = ax;
          otherAgent.vy = ay;

          // test for contagion

          if (agent.status === 'sick' && otherAgent.status === 'healthy') {
            if (random() <= contaminationRisk) {
              otherAgent.status = 'sick';
              otherAgent.recovery = tick + recoveryTicks;
            }
          }
          if (agent.status === 'healthy' && otherAgent.status === 'sick') {
            if (random() <= contaminationRisk) {
              agent.status = 'sick';
              agent.recovery = tick + recoveryTicks;
            }
          }
        }
      }

      // now move

      agent.x = agent.x + agent.vx;
      agent.y = agent.y + agent.vy;

      // bouncing on walls
      if (
        (agent.vy < 0 && agent.y < r) ||
        (agent.vy > 0 && agent.y > height - r)
      ) {
        agent.vy = -agent.vy;
      }

      if (
        (agent.vx < 0 && agent.x < r) ||
        (agent.vx > 0 && agent.x > width - r)
      ) {
        agent.vx = -agent.vx;
      }
    }
    // counting agents
    switch (agent.status) {
      case 'sick':
        nbSick++;
        break;
      case 'healthy':
        nbHealthy++;
        break;
      case 'recovered':
        nbRecovered++;
        break;
      case 'dead':
        nbDead++;
        break;
      default:
    }
  });
  if (nbSick === 0) {
    complete();
  }

  return {
    agents: updatedData,
    sick: nbSick,
    recovered: nbRecovered,
    dead: nbDead,
    healthy: nbHealthy,
  };
}

function chooseMamongN(n, m, random) {
  const N = [...Array(n).keys()].reduce((prev, curr) => {
    prev[curr] = true;
    return prev;
  }, {});
  const results = new Set();

  for (let i = 0; i < m; i++) {
    const k = Math.floor(random() * Object.keys(N).length);
    results.add(k);
    delete N[k];
  }

  return results;
}

function findOverlaps(agents, i, r, point) {
  const { x: x0, y: y0 } = point;
  const domain = agents.slice(i);
  return domain.filter(({ x, y }) => Math.hypot(x - x0, y - y0) < r);
}

export function initData(
  {
    nbAgents = 200,
    nbSick = 5,
    maxSpeed = 30,
    contaminationRisk = 1,
    deathRisk = 0.005,
    recoveryTicks = 20,
    nbDistancing = 50,
    r = 3,
    height = 300,
    width = 400,
  },
  random = Math.random
) {
  const sick = chooseMamongN(nbAgents, nbSick, random);
  const distancing = chooseMamongN(nbAgents, nbDistancing, random);
  const agents = [];

  for (let i = 0; i < nbAgents; i++) {
    let x, y;

    do {
      y = r / 2 + random() * (height - r);
      x = r / 2 + random() * (width - r);
    } while (findOverlaps(agents, 0, r, { x, y }).length);

    const status = sick.has(i) ? 'sick' : 'healthy';

    const recovery = sick.has(i) ? recoveryTicks : null;
    const isDistancing = distancing.has(i);
    const speed = isDistancing ? 0 : maxSpeed;
    const vx = speed * (random() * 2 - 1);
    const vy = speed * (random() * 2 - 1);
    const isBouncing = false;

    agents.push({
      x,
      y,
      status,
      isBouncing,
      isDistancing,
      vx,
      vy,
      recovery,
      speed,
    });
  }
  return {
    agents,
    sick: nbSick,
    healthy: nbAgents - nbSick,
    dead: 0,
    recovered: 0,
  };
}

export class EpidemicFrame extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidUpdate() {
    const {
      data,
      params: { width, height, r },
    } = this.props;
    const canvas = this.myRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.lineWidth = '5px';
    ctx.clearRect(0, 0, width, height);
    data.agents.forEach(({ status, isBouncing, x, y }) => {
      ctx.beginPath();
      ctx.fillStyle = COLORS[status];
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    });
  }
  render() {
    return (
      <div>
        <canvas
          width={this.props.params.width}
          height={this.props.params.height}
          ref={this.myRef}
        />
      </div>
    );
  }
}

const ConnectedFrame = withFrame(EpidemicFrame);

const series = [
  {
    color: COLORS['healthy'],
    label: 'Healthy',
    accessor: d => d.healthy,
  },
  {
    color: COLORS['sick'],
    label: 'Sick',
    accessor: d => d.sick,
  },
  {
    color: COLORS['recovered'],
    label: 'Recovered',
    accessor: d => d.recovered,
  },
  {
    color: COLORS['dead'],
    label: 'Dead',
    accessor: d => d.dead,
  },
];

const Epidemic = props => (
  <Model
    initData={initData}
    initialParams={{
      nbAgents: 500,
      nbSick: 20,
      contaminationRisk: 1,
      deathRisk: 0.001,
      maxSpeed: 2,
      recoveryTicks: 200,
      nbDistancing: 0,
      r: 2,
      height: 332,
      width: 332,
    }}
    updateData={updateEpidemic}
    maxTime={500}
    {...props}
  >
    <Flex flexDirection="column">
      <ConnectedFrame />
      {props.hideSeries ? null : <TimeSeries series={series} stacked={true} />}
      {props.hideSeries ? null : <Counter series={series} />}
    </Flex>
  </Model>
);

export default Epidemic;
