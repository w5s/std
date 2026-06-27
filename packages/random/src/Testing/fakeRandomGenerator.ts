import { from as taskFrom } from '@w5s/task/Task/from';
import type { RandomGenerator } from '../RandomGenerator.js';

/**
 *
 * @example
 * ```typescript
 * const randomGenerator = fakeRandomGenerator(() => 0.123)
 * ```
 * @param getNextValue the implementation
 */
export function fakeRandomGenerator(getNextValue: () => number): RandomGenerator {
  return taskFrom(({ resolve }) => resolve(getNextValue()));
}
