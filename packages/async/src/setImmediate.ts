/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { ImmediateId } from './ImmediateId.js';

const __setImmediate =
  globalThis.setImmediate == null
    ? (fn: () => void) => globalThis.setTimeout(fn, 0)
    : (fn: () => void) => Number(globalThis.setImmediate(fn));

/**
 * A polyfill for {@link setImmediate}
 *
 * @example
 * ```typescript
 * const id = setImmediate(() => console.log('Hello World!'));
 * ```
 * @param callback - the function to call
 */
export function setImmediate(callback: () => void): ImmediateId {
  return __setImmediate(callback) as ImmediateId;
}
