/**
 * Serialization boundary for the worker wire.
 *
 * This is the ONLY file in the codebase where `unknown` and `as` casts are
 * permitted. postMessage uses structured clone, which preserves object shape
 * but erases TypeScript types. These functions mark the boundary explicitly.
 */

import type { WorkerToMainMessage, MainToWorkerMessage } from './protocol';

// -- Worker → Main ----------------------------------------------------------

/**
 * Cast a typed snapshot to the wire format for postMessage.
 * Called in the worker before posting to the main thread.
 *
 * Why the cast: postMessage accepts `unknown` and structured clone preserves
 * the object shape, but TypeScript can't verify this across the wire.
 */
export function serializeWorkerMessage<Data, Params>(
  msg: WorkerToMainMessage<Data, Params>
): unknown {
  return msg;
}

/**
 * Cast a raw message from the worker back to typed form.
 * Called on the main thread in the onmessage handler.
 *
 * Why the cast: the message arrives as `MessageEvent<unknown>` from the
 * browser. We trust the worker sends well-formed messages per the protocol.
 */
export function deserializeWorkerMessage<Data, Params>(
  raw: unknown
): WorkerToMainMessage<Data, Params> {
  // Structured clone preserves shape; this cast marks the deserialization boundary.
  return raw as WorkerToMainMessage<Data, Params>;
}

// -- Main → Worker ----------------------------------------------------------

/**
 * Cast a typed command to the wire format for postMessage.
 * Called on the main thread before posting to the worker.
 */
export function serializeMainMessage<Params>(
  msg: MainToWorkerMessage<Params>
): unknown {
  return msg;
}

/**
 * Cast a raw message from main to typed form.
 * Called in the worker in the onmessage handler.
 */
export function deserializeMainMessage<Params>(
  raw: unknown
): MainToWorkerMessage<Params> {
  // Structured clone preserves shape; this cast marks the deserialization boundary.
  return raw as MainToWorkerMessage<Params>;
}
