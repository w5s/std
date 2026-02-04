import { $storage } from './$storage.js';
import type { Storage } from './Storage.js';

/**
 * Get or create a map object storage for `hostObject`
 *
 * @example
 * ```typescript
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
  return (target[$storage] as Storage | undefined) ?? (target[$storage] = new Map());
}
