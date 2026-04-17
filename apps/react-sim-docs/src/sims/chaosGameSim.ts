import { defineSim } from 'react-sim-engine/sim';

export type ChaosParams = {
  height: number;
  width: number;
  nbAttractors: number;
  /** Radians; omit to randomize once per run (stored in `data.angleOffset`). */
  angle?: number;
  r: number;
  /** Length `nbAttractors`: '1' = vertex participates in random choice */
  rules: string;
};

export type ChaosPoint = { x: number; y: number };

export type ChaosData = {
  attractors: ChaosPoint[];
  background: string;
  color: string;
  points: ChaosPoint[];
  prevDirection: number;
  angleOffset: number;
};

/** Payload for Mode 2 main-thread canvas (avoid sending attractors every frame). */
export type ChaosRenderState = {
  background: string;
  color: string;
  points: ChaosPoint[];
};

function updateAttractors(args: {
  angleOffset: number;
  nbAttractors: number;
  height: number;
  width: number;
}): ChaosPoint[] {
  const { angleOffset, nbAttractors, height, width } = args;
  const center = { x: width / 2, y: height / 2 };
  const radius = (0.95 * Math.min(height, width)) / 2;
  return [...Array(nbAttractors).keys()].map((i) => {
    const angle = angleOffset + (0.5 * (nbAttractors + 4 * i)) / nbAttractors;
    return {
      x: center.x + radius * Math.cos(angle * Math.PI),
      y: center.y - radius * Math.sin(angle * Math.PI)
    };
  });
}

export default defineSim<ChaosData, ChaosParams>({
  defaultParams: {
    height: 332,
    width: 332,
    nbAttractors: 7,
    r: 1,
    rules: '1001100'
  },

  init: (params) => {
    const random = Math.random;
    const angleOffset = params.angle === undefined ? random() * 2 * Math.PI : params.angle;
    const attractors = updateAttractors({
      angleOffset,
      nbAttractors: params.nbAttractors,
      height: params.height,
      width: params.width
    });
    const o: ChaosPoint = {
      x: random() * params.width,
      y: random() * params.height
    };
    const background = `hsla(${Math.floor(random() * 360)}, 30%, 7%, 1)`;
    const color = `hsla(${Math.floor(random() * 360)}, 77%, 45%, 1)`;
    return {
      attractors,
      background,
      color,
      points: [o],
      prevDirection: 0,
      angleOffset
    };
  },

  step: ({ data, params }) => {
    const { nbAttractors, height, width } = params;
    let attractors = data.attractors;
    if (attractors.length !== nbAttractors) {
      attractors = updateAttractors({
        angleOffset: data.angleOffset,
        nbAttractors,
        height,
        width
      });
    }
    const rulesStr = params.rules.padEnd(nbAttractors, '1').slice(0, nbAttractors);
    const rules = rulesStr
      .split('')
      .reduce<number[]>((prev, curr, i) => {
        if (curr === '1') prev.push(i);
        return prev;
      }, []);
    const pick = rules.length ? rules : [...Array(nbAttractors).keys()];
    const random = Math.random;
    const direction = (data.prevDirection + pick[Math.floor(random() * pick.length)]) % nbAttractors;
    const lastPoint = data.points[data.points.length - 1];
    const attractor = attractors[direction];
    const newPoint: ChaosPoint = {
      x: (lastPoint.x + attractor.x) / 2,
      y: (lastPoint.y + attractor.y) / 2
    };
    return {
      ...data,
      attractors,
      prevDirection: direction,
      points: [...data.points, newPoint]
    };
  },
});
