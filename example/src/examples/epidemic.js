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

export function updateEpidemic(data, tick, params) {
  let updatedData = JSON.parse(JSON.stringify(data));
  let nbSick = 0;

  const { contaminationRisk, deathRisk, r, height, width } = params;

  updatedData.forEach((agent, i) => {
    const {
      status,
      x,
      y,
      vx,
      vy,
      angle,
      recovery,
      recoveryTicks,
      speed
    } = agent;
    let status0 = status;

    let recovery0 = recovery;
    if (status0 === "sick") {
      if (tick >= recovery) {
        status0 = "recovered";
      } else {
        if (Math.random() < deathRisk) {
          status0 = "dead";
        }
      }
    }
    if (status0 === "dead") {
      updatedData[i].status = status0;
    } else {
      let angle0 = angle;
      let vx0 = vx;
      let vy0 = vy;
      // tentative new position
      let x0 = x + vx0;
      let y0 = y + vy0;

      // bouncing on walls
      if (y0 < 0 || y0 > height) {
        angle0 = -angle0;
      }

      if (x0 < 0 || x0 > width) {
        angle0 = Math.PI - angle0;
      }

      if (angle0 !== angle) {
        [vx0, vy0] = updateVxVy(angle0, speed);
        x0 = x + vx0;
        y0 = y + vy0;
      }

      const collisions = findOverlaps(updatedData, i + 1, r, { x: x0, y: y0 });

      if (collisions.length) {
        const sumAngles = collisions.reduce(
          (prev, curr) => prev + curr.angle,
          angle0
        );
        // current agent will be stopped for this tick.
        x0 = x;
        y0 = y;

        angle0 = (sumAngles - agent.angle) / collisions.length;
        [vx0, vy0] = updateVxVy(angle0, speed);

        collisions.forEach(otherAgent => {
          // we are mutating agents we haven't looped through yet
          otherAgent.angle = (sumAngles - otherAgent.angle) / collisions.length;

          [otherAgent.vx, otherAgent.vy] = updateVxVy(otherAgent.angle, speed);
          // contagion
          if (status0 === "sick" && otherAgent.status === "healthy") {
            if (Math.random() <= contaminationRisk) {
              otherAgent.status = "sick";
              otherAgent.recovery = tick + recoveryTicks;
            }
          }
          if (status0 === "healthy" && otherAgent.status === "sick") {
            if (Math.random() <= contaminationRisk) {
              status0 = "sick";
              recovery0 = tick + recoveryTicks;
            }
          }
        });
      }
      if (status0 === "sick") {
        nbSick++;
      }
      updatedData[i] = {
        ...agent,
        recovery: recovery0,
        status: status0,
        x: x0,
        y: y0,
        vx: vx0,
        vy: vy0
        // other properties don't change
      };
    }
  });
  return [updatedData, nbSick === 0];
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
  maxSpeed = 10,
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
    const angle = Math.random() * 2 * Math.PI;
    const [vx, vy] = updateVxVy(angle, speed);

    agents.push({
      x,
      y,
      status,
      isDistancing,
      vx,
      vy,
      recovery,
      speed,
      angle
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
    ctx.clearRect(0, 0, width, height);
    data.forEach(({ status, x, y }) => {
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
