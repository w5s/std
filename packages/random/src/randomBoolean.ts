import type { Task } from '@w5s/task';
import { map } from '@w5s/task/dist/Task/map.js';
import { type RandomGenerator, randomGenerator } from './randomGenerator.js';

/**
 * Return a Task that will generate booleans.
 *
 * @example
 * ```typescript
 * const next = randomBoolean(0.7);
 * Task.run(next);// Result.Ok(true|false);
 * ```
 * @param trueWeight - the probability to obtain true
 * @param generator - a custom optional random number generator
 */
export function randomBoolean(trueWeight = 0.5, generator?: RandomGenerator): Task<boolean, never> {
  return map(generator ?? randomGenerator, (value) => value > trueWeight);
}
