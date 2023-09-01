import type { Ref, Task, Option } from '@w5s/core';
import { invariant } from '@w5s/core/dist/invariant.js';
import type { UUID } from './uuid.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cryptoModule: Option<Pick<Crypto, 'randomUUID'>> =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  globalThis.crypto === undefined
    ? // eslint-disable-next-line unicorn/prefer-module
      typeof require === 'undefined'
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
        require('node:crypto')
    : globalThis.crypto;

export interface UUIDGenerator {
  /**
   * Return the next UUID (v4)
   */
  (): string;
}

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
export const randomUUID: Task<UUID, never> & Ref<UUIDGenerator> = {
  taskRun: ({ resolve }) => resolve(randomUUID.current() as UUID),
  current:
    cryptoModule == null
      ? () => invariant(false, 'crypto.randomUUID not found')
      : cryptoModule.randomUUID.bind(cryptoModule),
};
