import type { Option, Ref, UUID } from '@w5s/core';
import type { Task } from '@w5s/task';
import { invariant } from '@w5s/error/dist/invariant.js';
import { useRef } from '@w5s/application';
import { from } from '@w5s/task/dist/Task/from.js';
import { application } from './application.js';

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
 * Default UUID generator
 *
 * @example
 */
export const defaultUUIDGenerator: Ref<UUIDGenerator> = useRef(
  application.state,
  'uuidGenerator',
  cryptoModule == null
    ? () => invariant(false, 'crypto.randomUUID not found')
    : cryptoModule.randomUUID.bind(cryptoModule),
);

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
  return from(({ resolve }) => resolve(defaultUUIDGenerator.current() as UUID));
}
