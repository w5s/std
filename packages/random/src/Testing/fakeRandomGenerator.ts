import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { RandomGenerator } from '../randomGenerator.js';

/**
 *
 * @example
 * ```ts
 * const randomGenerator = fakeRandomGenerator(() => 0.123)
 * ```
 * @param getNextValue - the implementation
 */
export function fakeRandomGenerator(getNextValue: () => number): RandomGenerator {
  return taskFrom(({ resolve }) => resolve(getNextValue()));
}
