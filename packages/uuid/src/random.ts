import { Ref, Task } from '@w5s/core';
// @ts-ignore Avoid depending on @types/uuid for just one line of code
import { v4 as uuidV4 } from 'uuid';
import { UUID } from './data';

const randomUUIDRef: Ref<() => UUID> = Ref<() => UUID>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  uuidV4
);

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
export const randomUUID = Object.assign(
  Task.Sync<UUID, never>(({ ok }) => ok(randomUUIDRef.current())),
  {
    ref: randomUUIDRef,
  }
);
