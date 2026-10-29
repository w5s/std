import { $shadowStorage } from './$shadowStorage.js';
import { ShadowStorage } from './ShadowStorage.js';

/**
 * Get or create a map object storage for `hostObject`
 *
 * @example
 * ```typescript
 * const objectStorage = useShadowStorage(someObject);
 * const globalStorage = useShadowStorage(globalThis);
 * ```
 * @param hostObject the object hosting the storage
 */
export function useShadowStorage(hostObject: object): ShadowStorage {
  const target = hostObject as Record<string | symbol, unknown>;

  return (target[$shadowStorage] as ShadowStorage | undefined) ?? (target[$shadowStorage] = ShadowStorage.create());
}
