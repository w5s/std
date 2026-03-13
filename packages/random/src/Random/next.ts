import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { configuration } from '../configuration.js';
import type { RandomGenerator } from '../RandomGenerator.js';

/**
 * @example
 * ```typescript
 * Task.run(Random.next);// Math.random()
 * ```
 */
export const next: RandomGenerator = taskFrom(({ resolve }) => resolve(configuration.get('randomNumberGenerator')()));
