import type { Task } from '@w5s/core';
import { RandomGenerator } from './randomGenerator.js';

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
 */
export function randomNumber(
  min: number,
  max: number,
  generator: RandomGenerator = RandomGenerator.defaultRef.current
): Task<number, never> {
  return {
    taskRun: (resolveTask, rejectTask, cancelerRef) =>
      generator.taskRun((value) => resolveTask(min + (max - min) * value), rejectTask, cancelerRef),
  };
}
