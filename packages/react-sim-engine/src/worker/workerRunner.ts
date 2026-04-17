/**
 * Main-thread side of the worker runner.
 *
 * Creates a Web Worker, sends commands, and subscribes to snapshot updates.
 * The worker owns the tick loop; this side is a passive subscriber.
 */

import type { EngineSnapshot, SimulationStatus } from '../engine';
import type { MainToWorkerMessage, WorkerConfig } from './protocol';
import { deserializeWorkerMessage, serializeMainMessage } from './serialize';

export type WorkerRunnerConfig<Params> = {
  initialParams: Params;
  config: WorkerConfig;
};

export type WorkerRunner<Data, Params> = {
  getSnapshot: () => EngineSnapshot<Data, Params>;
  subscribe: (
    listener: (snapshot: EngineSnapshot<Data, Params>) => void
  ) => () => void;

  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (tick: number) => void;
  advance: (count?: number) => void;
  setParams: (patch: Partial<Params>) => void;
  resetWith: (patch?: Partial<Params>) => void;

  destroy: () => void;
};

export function createWorkerRunner<Data, Params>(
  worker: Worker,
  config: WorkerRunnerConfig<Params>
): WorkerRunner<Data, Params> {
  const listeners = new Set<
    (snapshot: EngineSnapshot<Data, Params>) => void
  >();

  let currentSnapshot: EngineSnapshot<Data, Params> = {
    data: undefined as Data,
    params: config.initialParams,
    tick: 0,
    status: 'idle' as SimulationStatus,
  };

  let errorMessage: string | null = null;

  function send(msg: MainToWorkerMessage<Params>) {
    worker.postMessage(serializeMainMessage(msg));
  }

  function emit() {
    for (const l of listeners) {
      l(currentSnapshot);
    }
  }

  worker.onmessage = (event: MessageEvent) => {
    const msg = deserializeWorkerMessage<Data, Params>(event.data);

    switch (msg.kind) {
      case 'snapshot':
        currentSnapshot = msg.snapshot;
        emit();
        break;
      case 'error':
        errorMessage = msg.error.message;
        currentSnapshot = { ...currentSnapshot, status: 'stopped' };
        emit();
        break;
      case 'ready':
        // Worker initialized, emit initial snapshot
        break;
    }
  };

  worker.onerror = (event) => {
    errorMessage = event.message ?? 'Unknown worker error';
    currentSnapshot = { ...currentSnapshot, status: 'stopped' };
    emit();
  };

  return {
    getSnapshot: () => currentSnapshot,

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    play: () => send({ kind: 'play' }),
    pause: () => send({ kind: 'pause' }),
    stop: () => send({ kind: 'stop' }),
    seek: (tick: number) => send({ kind: 'seek', tick }),
    advance: (count = 1) => send({ kind: 'advance', count }),
    setParams: (patch: Partial<Params>) =>
      send({ kind: 'setParams', patch }),
    resetWith: (patch?: Partial<Params>) =>
      send({ kind: 'resetWith', patch }),

    destroy() {
      listeners.clear();
      send({ kind: 'destroy' });
      worker.terminate();
    },
  };
}
