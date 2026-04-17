import { defineSim } from 'react-sim-engine/sim';

export type AgentStatus = 'sick' | 'healthy' | 'recovered' | 'dead';

export type EpidemicAgent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  status: AgentStatus;
  /** Absolute tick at which a sick agent becomes recovered (see update logic). */
  recovery: number | null;
  isDistancing: boolean;
  speed: number;
};

export type EpidemicData = {
  agents: EpidemicAgent[];
  sick: number;
  healthy: number;
  dead: number;
  recovered: number;
};

export type EpidemicParams = {
  nbAgents: number;
  nbSick: number;
  maxSpeed: number;
  contaminationRisk: number;
  deathRisk: number;
  recoveryTicks: number;
  nbDistancing: number;
  r: number;
  height: number;
  width: number;
};

export type EpidemicRenderState = {
  agents: EpidemicAgent[];
  width: number;
  height: number;
  r: number;
  sick: number;
  healthy: number;
  recovered: number;
  dead: number;
};

function chooseMAmongN(n: number, m: number, random: () => number): Set<number> {
  const available = new Set<number>(Array.from({ length: n }, (_, i) => i));
  const results = new Set<number>();
  for (let i = 0; i < m; i++) {
    const keys = [...available];
    const k = keys[Math.floor(random() * keys.length)];
    if (k === undefined) break;
    results.add(k);
    available.delete(k);
  }
  return results;
}

function findOverlaps(agents: EpidemicAgent[], i: number, r: number, point: { x: number; y: number }): EpidemicAgent[] {
  const { x: x0, y: y0 } = point;
  return agents.slice(i).filter(({ x, y }) => Math.hypot(x - x0, y - y0) < r);
}

export default defineSim<EpidemicData, EpidemicParams>({
  defaultParams: {
    nbAgents: 220,
    nbSick: 18,
    contaminationRisk: 1,
    deathRisk: 0.001,
    maxSpeed: 7,
    recoveryTicks: 200,
    nbDistancing: 0,
    r: 3.5,
    height: 332,
    width: 332
  },

  init: (params) => {
    const { nbAgents, nbSick, maxSpeed, recoveryTicks, nbDistancing, r, height, width } = params;
    const random = Math.random;
    const sick = chooseMAmongN(nbAgents, nbSick, random);
    const distancing = chooseMAmongN(nbAgents, nbDistancing, random);
    const agents: EpidemicAgent[] = [];

    for (let i = 0; i < nbAgents; i++) {
      let x = 0;
      let y = 0;
      do {
        y = r / 2 + random() * (height - r);
        x = r / 2 + random() * (width - r);
      } while (findOverlaps(agents, 0, r, { x, y }).length > 0);

      const status: AgentStatus = sick.has(i) ? 'sick' : 'healthy';
      const recovery = sick.has(i) ? recoveryTicks : null;
      const isDistancing = distancing.has(i);
      const speed = isDistancing ? 0 : maxSpeed;
      const vx = speed * (random() * 2 - 1);
      const vy = speed * (random() * 2 - 1);

      agents.push({ x, y, status, recovery, isDistancing, vx, vy, speed });
    }

    return {
      agents,
      sick: nbSick,
      healthy: nbAgents - nbSick,
      dead: 0,
      recovered: 0
    };
  },

  step: ({ data, params, tick }) => {
    const { contaminationRisk, deathRisk, r, recoveryTicks, height, width } = params;
    const random = Math.random;

    const updatedAgents: EpidemicAgent[] = JSON.parse(JSON.stringify(data.agents)) as EpidemicAgent[];
    let nbSick = 0;
    let nbHealthy = 0;
    let nbDead = 0;
    let nbRecovered = 0;

    updatedAgents.forEach((agent, i) => {
      if (agent.status === 'sick') {
        if (agent.recovery !== null && tick >= agent.recovery) {
          agent.status = 'recovered';
        } else if (random() < deathRisk) {
          agent.status = 'dead';
        }
      }

      if (agent.status !== 'dead') {
        for (let j = i + 1; j < updatedAgents.length; j++) {
          const otherAgent = updatedAgents[j];
          const dx = otherAgent.x - agent.x;
          const dy = otherAgent.y - agent.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 2 * r && distance > 0) {
            const ax = dx / distance;
            const ay = dy / distance;

            agent.vx = agent.vx - ax;
            agent.vy = agent.vy - ay;
            otherAgent.vx = ax;
            otherAgent.vy = ay;

            if (agent.status === 'sick' && otherAgent.status === 'healthy' && random() <= contaminationRisk) {
              otherAgent.status = 'sick';
              otherAgent.recovery = tick + recoveryTicks;
            }
            if (agent.status === 'healthy' && otherAgent.status === 'sick' && random() <= contaminationRisk) {
              agent.status = 'sick';
              agent.recovery = tick + recoveryTicks;
            }
          }
        }

        agent.x = agent.x + agent.vx;
        agent.y = agent.y + agent.vy;

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
          break;
      }
    });

    return {
      agents: updatedAgents,
      sick: nbSick,
      healthy: nbHealthy,
      dead: nbDead,
      recovered: nbRecovered
    };
  },

  shouldStop: (data) => data.sick === 0,
});
