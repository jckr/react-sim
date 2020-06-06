import React from 'react';
import { CanvasFrame } from 'react-sim';

import Model from './framed-model';

export const params = {
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
  width: 332,
};

// helpers

export const normalize = v => {
  const l = Math.hypot(...v);
  if (l === 0) {
    return v;
  }
  return div(v, l);
};

export const mult = (v, k) => v.map(d => d * k);
export const div = (v, k) => v.map(d => d / k);

export const add = (v0, v1) => v0.map((d, i) => d + v1[i]);
export const sub = (v0, v1) => v0.map((d, i) => d - v1[i]);

export const limit = (v, k) => {
  const force = Math.hypot(...v);
  const limitedForce = Math.min(force, k);
  return div(v, force / limitedForce);
};

export const initData = ({ height, nbBoids, width }, random = Math.random) => {
  const boids = Array(nbBoids)
    .fill(0)
    .map(d => {
      const angle = random() * 2 * Math.PI;
      const velocity = [Math.cos(angle), Math.sin(angle)];
      const boid = {
        angle,
        acceleration: [0, 0],
        position: [random() * width, random() * height],
        velocity,
      };
      return boid;
    });
  return boids;
};

export const updateData = ({ data, params }) => {
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
    width,
  } = params;

  const separation = data.map(d => [0, 0]);
  const alignment = data.map(d => [0, 0]);
  const cohesion = data.map(d => [0, 0]);

  data.forEach((boid, i) => {
    let countSeparation = 0;
    let countAlignment = 0;
    let countCohesion = 0;

    for (let j = 0; j < data.length; j++) {
      if (j !== i) {
        const otherBoid = data[j];
        const positionDifference = sub(boid.position, otherBoid.position);
        const distanceBetweenBoids = Math.hypot(...positionDifference);

        // separation

        if (
          distanceBetweenBoids > 0 &&
          distanceBetweenBoids < separationDistance
        ) {
          const diff = div(normalize(positionDifference), distanceBetweenBoids);
          separation[i] = add(separation[i], diff);
          countSeparation++;
        }

        // alignment

        if (
          distanceBetweenBoids > 0 &&
          distanceBetweenBoids < alignmentDistance
        ) {
          alignment[i] = add(alignment[i], otherBoid.velocity);
          countAlignment++;
        }

        // cohesion

        if (
          distanceBetweenBoids > 0 &&
          distanceBetweenBoids < cohesionDistance
        ) {
          cohesion[i] = add(cohesion[i], otherBoid.position);
          countCohesion++;
        }
      }
    }

    // separation

    if (countSeparation > 0) {
      separation[i] = div(separation[i], countSeparation);
      separation[i] = normalize(separation[i]);
      separation[i] = mult(separation[i], maxspeed);
      separation[i] = sub(separation[i], boid.velocity);
      separation[i] = limit(separation[i], maxforce);
      separation[i] = mult(separation[i], separationCoefficient);
    }

    // alignment
    if (countAlignment > 0) {
      alignment[i] = div(alignment[i], countAlignment);
      alignment[i] = normalize(alignment[i]);
      alignment[i] = mult(alignment[i], maxspeed);
      alignment[i] = sub(alignment[i], boid.velocity);
      alignment[i] = limit(alignment[i], maxforce);
      alignment[i] = mult(alignment[i], alignmentCoefficient);
    }

    // cohesion
    if (countCohesion > 0) {
      cohesion[i] = div(cohesion[i], countCohesion);
      cohesion[i] = seek(
        boid.position,
        cohesion[i],
        boid.velocity,
        maxspeed,
        maxforce
      );
      cohesion[i] = mult(cohesion[i], cohesionCoefficient);
    }
  });

  return data.map((boid, i) => {
    // applying all three forces
    const acceleration = add(add(alignment[i], cohesion[i]), separation[i]);
    const velocity = limit(add(boid.velocity, acceleration), maxspeed);
    const position = add(boid.position, velocity);
    const angle = Math.atan2(boid.velocity[1], boid.velocity[0]);
    // wraparound

    if (position[0] < -r) {
      position[0] = width + r;
    }
    if (position[0] > width + r) {
      position[0] = -r;
    }
    if (position[1] < -r) {
      position[1] = height + r;
    }
    if (position[1] > height + r) {
      position[1] = -r;
    }
    return {
      ...boid,
      angle,
      position,
      velocity,
    };
  });
};

export const seek = (position, target, velocity, maxspeed, maxforce) => {
  const desired = mult(normalize(sub(target, position)), maxspeed);
  const steer = sub(desired, velocity);
  return limit(steer, maxforce);
};

export const draw = ({
  ctx,
  circle,
  data,
  params: {
    alignmentDistance,
    cohesionDistance,
    separationDistance,
    height,
    showCircles,
    width,
    r,
  },
}) => {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
  data.forEach(({ position: [x, y], angle }) => {
    ctx.strokeStyle = '#000';
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
    ctx.lineTo(
      x + (Math.cos(angle + (Math.PI * 2) / 3) * r * 2) / 3,
      y + (Math.sin(angle + (Math.PI * 2) / 3) * r * 2) / 3
    );
    ctx.lineTo(
      x + (Math.cos(angle + (Math.PI * 4) / 3) * r * 2) / 3,
      y + (Math.sin(angle + (Math.PI * 4) / 3) * r * 2) / 3
    );
    ctx.closePath();
    ctx.stroke();
    if (showCircles) {
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#f00';
      circle({ x, y, r: separationDistance });
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = '#0f0';
      circle({ x, y, r: alignmentDistance });
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = '#00f';
      circle({ x, y, r: cohesionDistance });
      ctx.closePath();
      ctx.stroke();
    }
  });
};

export const Frame = props => <CanvasFrame draw={draw} {...props} />;

const Boids = props => (
  <Model
    initialParams={params}
    maxTime={Infinity}
    nocache
    initData={initData}
    updateData={updateData}
    controls={[
      [
        {
          param: 'alignmentCoefficient',
          label: 'Alignment',
          minValue: 0,
          maxValue: 3,
          step: 0.01,
        },
        {
          param: 'alignmentDistance',
          label: 'Radius',
          minValue: 0,
          maxValue: 50,
          step: 1,
        },
      ],
      [
        {
          param: 'cohesionCoefficient',
          label: 'Cohesion',
          minValue: 0,
          maxValue: 3,
          step: 0.01,
        },
        {
          param: 'cohesionDistance',
          label: 'Radius',
          minValue: 0,
          maxValue: 50,
          step: 1,
        },
      ],
      [
        {
          param: 'separationCoefficient',
          label: 'Separation',
          minValue: 0,
          maxValue: 3,
          step: 0.01,
        },
        {
          param: 'separationDistance',
          label: 'Radius',
          minValue: 0,
          maxValue: 50,
          step: 1,
        },
      ],
      {
        param: 'showCircles',
        label: 'Show circles:',
        type: 'toggle',
      },
    ]}
    {...props}
  >
    <Frame />
  </Model>
);

export const ChillBoids = props => (
  <Boids isPlaying noCache noControls {...props} />
);
export default Boids;
