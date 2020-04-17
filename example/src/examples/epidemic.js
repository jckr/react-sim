import React from "react";
import { FlexRow, FlexColumn, Model } from "react-sim";

const COLORS = {
  sick: "red",
  recovered: "gold",
  healthy: "blue",
  dead: "black"
};

// helpers

function updateVxVy(angle, speed) {
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  return [vx, vy];
}

export function updateEpidemic({ data, tick, params, pause }) {
  let updatedData = JSON.parse(JSON.stringify(data));
  let nbSick = 0;

  const {
    contaminationRisk,
    deathRisk,
    r,
    recoveryTicks,
    height,
    width
  } = params;

  updatedData.forEach((agent, i) => {
    // update status

    if (agent.status === "sick") {
      if (tick >= agent.recovery) {
        agent.status = "recovered";
      } else {
        if (Math.random() < deathRisk) {
          agent.status = "dead";
        }
      }
    }
    if (agent.status !== "dead") {
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

          if (agent.status === "sick" && otherAgent.status === "healthy") {
            if (Math.random() <= contaminationRisk) {
              otherAgent.status = "sick";
              otherAgent.recovery = tick + recoveryTicks;
            }
          }
          if (agent.status === "healthy" && otherAgent.status === "sick") {
            if (Math.random() <= contaminationRisk) {
              agent.status = "sick";
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

      // counting sick agents

      if (agent.status === "sick") {
        nbSick++;
      }
    }
  });
  if (nbSick === 0) {
    pause();
  }

  return updatedData;
}

function chooseMamongN(n, m) {
  const N = [...Array(n).keys()].reduce((prev, curr) => {
    prev[curr] = true;
    return prev;
  }, {});
  const results = new Set();

  for (let i = 0; i < m; i++) {
    const k = Math.floor(Math.random() * Object.keys(N).length);
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

function initData({
  nbAgents = 200,
  nbSick = 5,
  maxSpeed = 30,
  contaminationRisk = 1,
  deathRisk = 0.005,
  recoveryTicks = 20,
  nbDistancing = 50,
  r = 3,
  height = 300,
  width = 400
}) {
  const sick = chooseMamongN(nbAgents, nbSick);
  const distancing = chooseMamongN(nbAgents, nbDistancing);
  const agents = [];
  for (let i = 0; i < nbAgents; i++) {
    let x, y;

    do {
      y = r / 2 + Math.random() * (height - r);
      x = r / 2 + Math.random() * (width - r);
    } while (findOverlaps(agents, 0, r, { x, y }).length);

    const status = sick.has(i) ? "sick" : "healthy";
    const recovery = sick.has(i) ? recoveryTicks : null;
    const isDistancing = distancing.has(i);
    const speed = isDistancing ? 0 : maxSpeed;
    const vx = speed * (Math.random() * 2 - 1);
    const vy = speed * (Math.random() * 2 - 1);
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
      speed
    });
  }
  return agents;
}

export class EpidemicFrame extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidUpdate() {
    const {
      data,
      params: { width, height, r }
    } = this.props;
    const canvas = this.myRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.lineWidth = '5px';
    ctx.clearRect(0, 0, width, height);
    data.forEach(({ status, isBouncing, x, y }) => {
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
        <div
          style={{
            cursor: "pointer",
            background: "#eee",
            padding: "8px",
            margin: "8px 8px 8px 0",
            width: "fit-content"
          }}
          onClick={this.props.initData}
        >
          Reset sim
        </div>
      </div>
    );
  }
}

const Epidemic = () => (
  <Model
    auto="false"
    initData={initData}
    initialParams={{
      nbAgents: 500,
      nbSick: 20,
      contaminationRisk: 1,
      deathRisk: 0.001,
      maxSpeed: 2,
      recoveryTicks: 200,
      nbDistancing: 0,
      r: 3,
      height: 300,
      width: 400
    }}
    updateData={updateEpidemic}
    maxTime={Infinity}
  >
    <EpidemicFrame />
  </Model>
);

export default Epidemic;
