/**
 * Creates a Web Worker that loads a sim module and runs the engine.
 *
 * Uses a blob URL with dynamic import() — works in Vite dev (modules served
 * over HTTP) and in production builds (bundled chunks).
 */

import type { WorkerConfig } from './protocol';

/**
 * Worker script template. Runs inside the worker context.
 *
 * Flow:
 * 1. Receives init message with module URL and engine URL
 * 2. Dynamically imports both
 * 3. Creates engine from the sim module
 * 4. Drives tick loop via setTimeout with snapshot throttling
 * 5. Responds to play/pause/stop/seek/advance/setParams/resetWith/destroy
 */
const WORKER_SCRIPT = `
let engine = null;
let loopTimer = null;
let snapshotIntervalMs = 16;
let lastSnapshotMs = 0;
let ticksPerFrame = 1;
let delayMs = 0;

function emitSnapshot() {
  if (!engine) return;
  postMessage({ kind: 'snapshot', snapshot: engine.getSnapshot() });
  lastSnapshotMs = performance.now();
}

function tickLoop() {
  if (!engine || engine.getStatus() !== 'playing') return;

  for (let i = 0; i < ticksPerFrame; i++) {
    engine.advance(1);
    const s = engine.getStatus();
    if (s === 'stopped') { emitSnapshot(); return; }
    if (s !== 'paused') break;
  }

  // advance() transitions to paused; resume playing for the next batch
  if (engine.getStatus() === 'paused') engine.play();

  if (performance.now() - lastSnapshotMs >= snapshotIntervalMs) emitSnapshot();
  loopTimer = setTimeout(tickLoop, delayMs);
}

function stopLoop() {
  if (loopTimer !== null) { clearTimeout(loopTimer); loopTimer = null; }
}

self.onmessage = async (event) => {
  const msg = event.data;
  try {
    switch (msg.kind) {
      case 'init': {
        delayMs = msg.config.delayMs || 0;
        ticksPerFrame = msg.config.ticksPerFrame || 1;
        snapshotIntervalMs = msg.config.snapshotIntervalMs || 16;

        const [simMod, engineMod] = await Promise.all([
          import(msg.moduleUrl),
          import(msg.engineUrl),
        ]);
        const sim = simMod.default;
        engine = engineMod.createEngine({
          init: sim.init,
          step: sim.step,
          shouldStop: sim.shouldStop,
          initialParams: msg.params,
          maxTime: msg.config.maxTime,
        });
        postMessage({ kind: 'ready' });
        emitSnapshot();
        break;
      }
      case 'play':
        if (!engine) return;
        engine.play(); emitSnapshot(); stopLoop(); loopTimer = setTimeout(tickLoop, 0);
        break;
      case 'pause':
        if (!engine) return;
        stopLoop(); engine.pause(); emitSnapshot();
        break;
      case 'stop':
        if (!engine) return;
        stopLoop(); engine.stop(); emitSnapshot();
        break;
      case 'seek':
        if (!engine) return;
        stopLoop(); engine.seek(msg.tick); emitSnapshot();
        break;
      case 'advance':
        if (!engine) return;
        engine.advance(msg.count); emitSnapshot();
        break;
      case 'setParams':
        if (!engine) return;
        engine.setParams(msg.patch); emitSnapshot();
        break;
      case 'resetWith':
        if (!engine) return;
        stopLoop(); engine.resetWith(msg.patch); emitSnapshot();
        break;
      case 'destroy':
        stopLoop();
        if (engine) { engine.destroy(); engine = null; }
        self.close();
        break;
    }
  } catch (err) {
    postMessage({ kind: 'error', error: { message: err.message, stack: err.stack } });
  }
};
`;

export function createSimWorker<Params>(options: {
  moduleUrl: string;
  engineUrl: string;
  initialParams: Params;
  config: WorkerConfig;
}): Worker {
  const blob = new Blob([WORKER_SCRIPT], { type: 'text/javascript' });
  const blobUrl = URL.createObjectURL(blob);
  const worker = new Worker(blobUrl, { type: 'module' });

  // Clean up blob URL once worker is ready
  worker.addEventListener('message', function cleanup(event) {
    if (event.data?.kind === 'ready' || event.data?.kind === 'error') {
      URL.revokeObjectURL(blobUrl);
      worker.removeEventListener('message', cleanup);
    }
  });

  worker.postMessage({
    kind: 'init',
    moduleUrl: options.moduleUrl,
    engineUrl: options.engineUrl,
    params: options.initialParams,
    config: options.config,
  });

  return worker;
}
