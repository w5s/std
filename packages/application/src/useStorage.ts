import type { Option } from '@w5s/core';

// Inline
const $storage = Symbol.for('@w5s/storage');

/**
 * Type for the global Map that holds all application states
 */
export interface Storage extends Map<string, unknown> {}

/**
 * Get or create a map object storage for `hostObject`
 *
 * @example
 * ```ts
 * const objectStorage = useStorage(someObject);
 * const globalStorage = useStorage(globalThis);
 * ```
 * @param hostObject - the object hosting the storage
 */
export function useStorage(hostObject: object): Storage {
  const target = hostObject as {
    [P in string | symbol]: unknown;
  };
  // eslint-disable-next-line no-return-assign
  return (target[$storage] as Option<Storage>) ?? (target[$storage] = new Map());
}
