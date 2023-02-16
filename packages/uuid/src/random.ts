import type { Ref, Task, Option } from '@w5s/core';
import type { UUID } from './data.js';

const windowCrypto: Option<Crypto> = typeof window === 'undefined' ? undefined : window.crypto;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const nodeCrypto: Option<typeof import('node:crypto')> =
  // eslint-disable-next-line unicorn/prefer-module, @typescript-eslint/no-require-imports
  typeof require === 'undefined' ? undefined : require('node:crypto');

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
  taskRun: (resolve) => resolve(randomUUID.current() as UUID),
  current:
    windowCrypto == null
      ? nodeCrypto == null
        ? () => {
            throw new Error('NotImplemented');
          }
        : nodeCrypto.randomUUID
      : windowCrypto.randomUUID.bind(windowCrypto),
};
