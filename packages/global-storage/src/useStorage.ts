import type { Storage } from './Storage.js';

import { $storage } from './$storage.js';

/**
 * Get or create a map object storage for `hostObject`
 *
 * @example
 * ```typescript
 * const objectStorage = useStorage(someObject);
 * const globalStorage = useStorage(globalThis);
 * ```
 * @param hostObject the object hosting the storage
 */
export function useStorage(hostObject: object): Storage {
  const target = hostObject as Record<string | symbol, unknown>;

  return (target[$storage] as Storage | undefined) ?? (target[$storage] = new Map());
}
