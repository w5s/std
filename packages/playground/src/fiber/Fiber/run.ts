import type { FiberCallback } from '../FiberCallback.js';
import type { FiberResult } from '../FiberResult.js';
import { __scheduler } from '../__scheduler.js';

/**
 * Runs a fiber and returns the result.
 *
 * @example
 * ```typescript
 * const cow = Fiber.run(function* () {
 *   console.log('Moo ?');
 *   yield;
 *   console.log('Moo !');
 * });
 * const cat = Fiber.run(function* () {
 *   console.log('Meow ?');
 *   yield;
 *   console.log('Meow !');
 * });
 * // > Moo ?
 * // > Meow ?
 * // > Moo!
 * // > Meow !
 * ```
 *
 * @param callback - The generator function to run.
 */
export function run<T>(callback: FiberCallback<T>): FiberResult<T> {
  const result = __scheduler.spawn(callback);
  __scheduler.resume(result.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
