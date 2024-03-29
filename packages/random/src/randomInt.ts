import type { Int, Task } from '@w5s/core';
import { RandomGenerator } from './randomGenerator.js';
import { randomNumber } from './randomNumber.js';

/**
 * Return a Task that will generate integers between [`min`, `max`].
 *
 * @example
 * ```typescript
 * const next = randomInt(-10, 10);
 * unsafeRun(next);// Result.Ok(N); where N is an integer between -10 and 10
 * ```
 * @param min - the minimum inclusive bound for generated value
 * @param max - the maximum inclusive bound for generated value
 * @param generator - a custom optional random number generator
 */
export function randomInt(min: Int, max: Int, generator?: RandomGenerator): Task<Int, never> {
  return {
    taskRun: (parameters) =>
      randomNumber(min, max, generator).taskRun({
        ...parameters,
        resolve: (value) => parameters.resolve(Math.floor(value) as Int),
      }),
  };
}
