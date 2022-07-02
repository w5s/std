import type { Ref, Task } from '@w5s/core';
// @ts-ignore Avoid depending on @types/uuid for just one line of code
import { v4 as uuidV4 } from 'uuid';
import { UUID } from './data.js';

const randomUUIDRef: Ref<() => UUID> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  current: uuidV4,
};

/**
 * A task that returns a new `UUID`
 *
 * @example
 * ```typescript
 * const createUser = (name: string) => Task.map(randomUUID, (uuid) => ({
 *   id: uuid,
 *   name,
 * }));
 * ```
 */
export const randomUUID: Task<UUID, never> & {
  ref: Ref<() => UUID>;
} = {
  taskRun: (resolve) => resolve(randomUUIDRef.current()),
  ref: randomUUIDRef,
};
