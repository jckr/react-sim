export type Tick = number;

export type SimulationInitContext<Params> = {
  params: Params;
};

export type SimulationUpdateContext<Data, Params, Result> = {
  data: Data;
  params: Params;
  tick: Tick;
  cachedData: Readonly<Record<Tick, Data>>;
  /**
   * An opaque bag for simulation-specific helpers.
   * Intended to be serializable for worker use, if needed.
   */
  context?: unknown;
};

export type UpdateResult<Data, Result = unknown> =
  | { status: 'continue'; data: Data }
  | { status: 'pause'; data: Data }
  | { status: 'stop'; data: Data }
  | { status: 'complete'; data: Data; result?: Result };

export type InitDataFn<Params, Data, Result = unknown> = (
  params: Params,
  ctx?: unknown
) => Data;

export type UpdateDataFn<Data, Params, Result = unknown> = (
  args: SimulationUpdateContext<Data, Params, Result>
) => UpdateResult<Data, Result>;

export type EngineSnapshot<Data, Params, Result = unknown> = {
  data: Data;
  params: Params;
  tick: Tick;
  results: Result[];
  isPlaying: boolean;
  canPlay: boolean;
};

export type EngineConfig<Data, Params extends object, Result = unknown> = {
  initData: InitDataFn<Params, Data, Result>;
  updateData: UpdateDataFn<Data, Params, Result>;

  /**
   * Used as starting values before the first `init()`.
   * If `initialData` is provided, it will be used instead of calling `initData`.
   */
  initialParams: Params;
  initialData?: Data;

  initialTick?: Tick;
  minTime?: Tick;
  maxTime?: Tick; // `undefined` => open ended

  delayMs?: number; // wall clock delay between simulation updates
  ticksPerAnimation?: number; // how many ticks to advance per delay window
  loop?: boolean; // if true, re-init when `canPlay` becomes false
  noCache?: boolean; // disables caching of computed ticks

  onSnapshot?: (snapshot: EngineSnapshot<Data, Params, Result>) => void;
  onComplete?: (results: Result[]) => void;

  /**
   * Opaque, simulation-specific data passed through to initData/updateData.
   * Keep it worker-serializable if you plan to move updateData into a worker.
   */
  context?: unknown;
};

