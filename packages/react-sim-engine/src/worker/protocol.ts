/**
 * Wire protocol types for main ↔ worker communication.
 *
 * These types define the message shapes exchanged via postMessage.
 * The actual serialization boundary (where `unknown` and `as` casts live)
 * is in serialize.ts — not here.
 */

import type { EngineSnapshot } from '../engine';

/** Messages sent from the main thread to the worker. */
export type MainToWorkerMessage<Params> =
  | { kind: 'init'; params: Params; config: WorkerConfig }
  | { kind: 'play' }
  | { kind: 'pause' }
  | { kind: 'stop' }
  | { kind: 'seek'; tick: number }
  | { kind: 'advance'; count: number }
  | { kind: 'setParams'; patch: Partial<Params> }
  | { kind: 'resetWith'; patch?: Partial<Params> }
  | { kind: 'destroy' };

/** Messages sent from the worker to the main thread. */
export type WorkerToMainMessage<Data, Params> =
  | { kind: 'snapshot'; snapshot: EngineSnapshot<Data, Params> }
  | { kind: 'error'; error: { message: string; stack?: string } }
  | { kind: 'ready' };

/** Worker-specific configuration passed at init time. */
export type WorkerConfig = {
  maxTime?: number;
  delayMs?: number;
  ticksPerFrame?: number;
  snapshotIntervalMs?: number;
};
