import type { Task } from '@w5s/core';
import { RandomGenerator } from './randomGenerator.js';

/**
 * Return a Task that will generate booleans.
 *
 * @example
 * ```typescript
 * const next = randomBoolean(0.7);
 * unsafeRun(next);// Result.Ok(true|false);
 * ```
 * @param trueWeight - the probability to obtain true
 */
export function randomBoolean(
  trueWeight = 0.5,
  generator: RandomGenerator = RandomGenerator.defaultRef.current
): Task<boolean, never> {
  return {
    taskRun: (resolveTask, rejectTask, cancelerRef) =>
      generator.taskRun((value) => resolveTask(value > trueWeight), rejectTask, cancelerRef),
  };
}
