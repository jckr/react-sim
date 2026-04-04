import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import type { UpdateResult } from 'react-sim-engine/types';

export type Vec2 = readonly [number, number];

export type Boid = {
  angle: number;
  acceleration: Vec2;
  position: Vec2;
  velocity: Vec2;
};

/** Engine state is the flock array (matches original react-sim demo). */
export type BoidsData = Boid[];

export type BoidsParams = {
  alignmentCoefficient: number;
  alignmentDistance: number;
  cohesionCoefficient: number;
  cohesionDistance: number;
  height: number;
  maxforce: number;
  maxspeed: number;
  nbBoids: number;
  r: number;
  separationCoefficient: number;
  separationDistance: number;
  showCircles: boolean;
  width: number;
};

export type BoidsRenderState = {
  boids: Boid[];
};

/** Normalize worker context `data` when engine state is `Boid[]` and render state is `{ boids }`. */
export function boidsFromSnapshot(data: BoidsData | BoidsRenderState | null | undefined): Boid[] | undefined {
  if (data == null) return undefined;
  if (Array.isArray(data)) return data;
  return data.boids;
}

function normalize(v: Vec2): Vec2 {
  const l = Math.hypot(v[0], v[1]);
  if (l === 0) return v;
  return [v[0] / l, v[1] / l];
}

function mult(v: Vec2, k: number): Vec2 {
  return [v[0] * k, v[1] * k];
}

function div(v: Vec2, k: number): Vec2 {
  return [v[0] / k, v[1] / k];
}

function add(v0: Vec2, v1: Vec2): Vec2 {
  return [v0[0] + v1[0], v0[1] + v1[1]];
}

function sub(v0: Vec2, v1: Vec2): Vec2 {
  return [v0[0] - v1[0], v0[1] - v1[1]];
}

function limit(v: Vec2, k: number): Vec2 {
  const force = Math.hypot(v[0], v[1]);
  if (force === 0) return v;
  const limitedForce = Math.min(force, k);
  return div(v, force / limitedForce);
}

function seek(
  position: Vec2,
  target: Vec2,
  velocity: Vec2,
  maxspeed: number,
  maxforce: number
): Vec2 {
  const desired = mult(normalize(sub(target, position)), maxspeed);
  const steer = sub(desired, velocity);
  return limit(steer, maxforce);
}

export function initData(params: BoidsParams, _context?: unknown): BoidsData {
  const random = Math.random;
  const { height, nbBoids, width } = params;
  return Array.from({ length: nbBoids }, () => {
    const angle = random() * 2 * Math.PI;
    const velocity: Vec2 = [Math.cos(angle), Math.sin(angle)];
    return {
      angle,
      acceleration: [0, 0] as Vec2,
      position: [random() * width, random() * height] as Vec2,
      velocity
    };
  });
}

export function updateData(args: {
  data: BoidsData;
  params: BoidsParams;
  tick: number;
  cachedData: Record<number, BoidsData>;
}): UpdateResult<BoidsData> {
  const { data, params } = args;
  const {
    alignmentDistance,
    cohesionDistance,
    separationCoefficient,
    alignmentCoefficient,
    cohesionCoefficient,
    separationDistance,
    maxspeed,
    maxforce,
    r,
    height,
    width
  } = params;

  const separation: Vec2[] = data.map(() => [0, 0]);
  const alignment: Vec2[] = data.map(() => [0, 0]);
  const cohesion: Vec2[] = data.map(() => [0, 0]);

  data.forEach((boid, i) => {
    let countSeparation = 0;
    let countAlignment = 0;
    let countCohesion = 0;

    for (let j = 0; j < data.length; j++) {
      if (j === i) continue;
      const otherBoid = data[j];
      if (!otherBoid) continue;
      const positionDifference = sub(boid.position, otherBoid.position);
      const distanceBetweenBoids = Math.hypot(positionDifference[0], positionDifference[1]);

      if (distanceBetweenBoids > 0 && distanceBetweenBoids < separationDistance) {
        const diff = div(normalize(positionDifference), distanceBetweenBoids);
        separation[i] = add(separation[i], diff);
        countSeparation++;
      }

      if (distanceBetweenBoids > 0 && distanceBetweenBoids < alignmentDistance) {
        alignment[i] = add(alignment[i], otherBoid.velocity);
        countAlignment++;
      }

      if (distanceBetweenBoids > 0 && distanceBetweenBoids < cohesionDistance) {
        cohesion[i] = add(cohesion[i], otherBoid.position);
        countCohesion++;
      }
    }

    if (countSeparation > 0) {
      let s = div(separation[i], countSeparation);
      s = normalize(s);
      s = mult(s, maxspeed);
      s = sub(s, boid.velocity);
      s = limit(s, maxforce);
      separation[i] = mult(s, separationCoefficient);
    }

    if (countAlignment > 0) {
      let a = div(alignment[i], countAlignment);
      a = normalize(a);
      a = mult(a, maxspeed);
      a = sub(a, boid.velocity);
      a = limit(a, maxforce);
      alignment[i] = mult(a, alignmentCoefficient);
    }

    if (countCohesion > 0) {
      let c = div(cohesion[i], countCohesion);
      c = seek(boid.position, c, boid.velocity, maxspeed, maxforce);
      cohesion[i] = mult(c, cohesionCoefficient);
    }
  });

  const next: BoidsData = data.map((boid, i) => {
    const acceleration = add(add(alignment[i], cohesion[i]), separation[i]);
    const velocity = limit(add(boid.velocity, acceleration), maxspeed);
    const position = add(boid.position, velocity);
    const angle = Math.atan2(velocity[1], velocity[0]);

    let px = position[0];
    let py = position[1];
    if (px < -r) px = width + r;
    if (px > width + r) px = -r;
    if (py < -r) py = height + r;
    if (py > height + r) py = -r;

    return {
      ...boid,
      angle,
      position: [px, py] as Vec2,
      velocity
    };
  });

  return { status: 'continue', data: next };
}

export const module: SimulationModule<BoidsData, BoidsParams, BoidsRenderState, unknown> = {
  initData,
  updateData,
  selectRenderState: (snapshot) => ({ boids: snapshot.data }),
  defaultParams: {
    alignmentCoefficient: 1,
    alignmentDistance: 50,
    cohesionCoefficient: 1,
    cohesionDistance: 40,
    height: 332,
    maxforce: 0.03,
    maxspeed: 2,
    nbBoids: 50,
    r: 5,
    separationCoefficient: 1.5,
    separationDistance: 25,
    showCircles: true,
    width: 332
  }
};
