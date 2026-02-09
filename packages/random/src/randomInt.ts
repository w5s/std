import type { Int } from '@w5s/core';
import type { Task } from '@w5s/task';
import { map } from '@w5s/task/dist/Task/map.js';
import { randomNumber } from './randomNumber.js';
import type { RandomGenerator } from './RandomGenerator.js';

const toInt = (value: number) => Math.floor(value) as Int;

/**
 * Return a Task that will generate integers between [`min`, `max`].
 *
 * @example
 * ```typescript
 * const next = randomInt(-10, 10);
 * Task.run(next);// Result.Ok(N); where N is an integer between -10 and 10
 * ```
 * @param min - the minimum inclusive bound for generated value
 * @param max - the maximum inclusive bound for generated value
 * @param generator - a custom optional random number generator
 */
export function randomInt(min: Int, max: Int, generator?: RandomGenerator): Task<Int, never> {
  return map(randomNumber(min, max, generator), toInt);
}
