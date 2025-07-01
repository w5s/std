import { __setTimer } from './__setTimer.js';
import type { TimerOptions } from './TimerOptions.js';

/**
 * Resolves a promise after waiting `milliseconds`
 *
 * @example
 * ```typescript
 * await delay(5);// Will wait 5 milliseconds
 *
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(new Error('CustomError')));
 * await delay(5, { signal: controller.signal });// Will reject with Error('CustomError')
 * ```
 *
 * @param milliseconds - the delay to wait in milliseconds
 * @param options - the timer options
 */
export async function delay(milliseconds: number, options?: TimerOptions): Promise<void> {
  return __setTimer((resolve) => setTimeout(resolve, milliseconds), clearTimeout, options);
}
