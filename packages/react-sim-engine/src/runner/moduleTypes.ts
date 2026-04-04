import type { EngineSnapshot, Tick, UpdateResult } from '../types';

export type SimulationModule<Data, Params extends object, RenderState = Data, Result = unknown> = {
  initData: (params: Params) => Data;
  updateData: (args: { data: Data; params: Params; tick: Tick; cachedData: Record<number, Data> }) => UpdateResult<Data, Result>;
  /**
   * Optional reducer for Mode 2 (worker sim, main-thread render).
   * If provided, the worker can emit only RenderState instead of full Data.
   */
  selectRenderState?: (
    snapshot: Pick<EngineSnapshot<Data, Params, Result>, 'data' | 'params' | 'tick' | 'results'>
  ) => RenderState;
  draw?: (args: { ctx: OffscreenCanvasRenderingContext2D; snapshot: Pick<EngineSnapshot<Data, Params, Result>, 'data' | 'params' | 'tick'> }) => void;
  defaultParams?: Params;
};

export type SimulationModuleRef =
  | { kind: 'url'; url: string }
  | { kind: 'specifier'; specifier: string };
