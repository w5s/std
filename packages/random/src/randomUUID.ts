import type { UUID } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import type { UUIDString } from '@w5s/core/dist/Type/UUID.js';
import { RandomApplication } from './Random/RandomApplication.js';

export interface UUIDGenerator {
  /**
   * Return the next UUID (v4)
   */
  (): UUIDString;
}

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
  return from(({ resolve }) => resolve(RandomApplication.get('uuidGenerator')() as UUID));
}
