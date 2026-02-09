import type { Task } from '@w5s/task';
import { map } from '@w5s/task/dist/Task/map.js';
import { next } from './Random/next.js';
import type { RandomGenerator } from './RandomGenerator.js';

/**
 * Return a Task that will generate floating numbers between [`min`, `max`].
 *
 * @example
 * ```typescript
 * const next = randomNumber(-10, 10);
 * Task.run(next);// Result.Ok(F); where F is a floating number between -10 and 10
 * ```
 * @param min - the minimum inclusive bound for generated value
 * @param max - the maximum inclusive bound for generated value
 * @param generator - a custom optional random number generator
 */
export function randomNumber(min: number, max: number, generator?: RandomGenerator): Task<number, never> {
  return map(generator ?? next, (value) => min + (max - min) * value);
}
