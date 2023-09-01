import type { Task } from '@w5s/core';
import { RandomGenerator, defaultRandomGenerator } from './randomGenerator.js';

/**
 * Return a Task that will generate floating numbers between [`min`, `max`].
 *
 * @example
 * ```typescript
 * const next = randomNumber(-10, 10);
 * unsafeRun(next);// Result.Ok(F); where F is a floating number between -10 and 10
 * ```
 * @param min - the minimum inclusive bound for generated value
 * @param max - the maximum inclusive bound for generated value
 * @param generator - a custom optional random number generator
 */
export function randomNumber(min: number, max: number, generator?: RandomGenerator): Task<number, never> {
  return {
    taskRun: (parameters) =>
      (generator ?? defaultRandomGenerator.current).taskRun({
        ...parameters,
        resolve: (value) => parameters.resolve(min + (max - min) * value),
      }),
  };
}
