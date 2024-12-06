import type { UUID } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { RandomApplication } from './Random/RandomApplication.js';

/**
 * A task that returns a new `UUID`
 *
 * @example
 * ```typescript
 * const createUser = (name: string) => Task.map(randomUUID(), (uuid) => ({
 *   id: uuid,
 *   name,
 * }));
 * ```
 */
export function randomUUID(): Task<UUID, never> {
  return from(({ resolve }) => resolve(RandomApplication.get('randomUUIDGenerator')() as UUID));
}
