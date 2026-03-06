import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { application } from '../application.js';
import type { RandomGenerator } from '../RandomGenerator.js';

/**
 * @example
 * ```typescript
 * Task.run(Random.next);// Math.random()
 * ```
 */
export const next: RandomGenerator = taskFrom(({ resolve }) => resolve(application.get('randomNumberGenerator')()));
