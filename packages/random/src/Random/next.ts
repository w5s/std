import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

import type { RandomGenerator } from '../RandomGenerator.js';

import { configuration } from '../configuration.js';

/**
 * @example
 * ```typescript
 * Task.run(Random.next);// Math.random()
 * ```
 */
export const next: RandomGenerator = taskFrom(({ resolve }) => resolve(configuration.get('randomNumberGenerator')()));
