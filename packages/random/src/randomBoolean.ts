import type { Task } from '@w5s/core';
import { map } from '@w5s/core/dist/Task/map.js';
import { RandomGenerator, defaultRandomGenerator } from './randomGenerator.js';

/**
 * Return a Task that will generate booleans.
 *
 * @example
 * ```typescript
 * const next = randomBoolean(0.7);
 * Task.unsafeRun(next);// Result.Ok(true|false);
 * ```
 * @param trueWeight - the probability to obtain true
 * @param generator - a custom optional random number generator
 */
export function randomBoolean(trueWeight = 0.5, generator?: RandomGenerator): Task<boolean, never> {
  return map(generator ?? defaultRandomGenerator.current, (value) => value > trueWeight);
}
