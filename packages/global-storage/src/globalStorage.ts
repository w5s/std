import { useStorage } from './useStorage.js';

/**
 * Get or create a storage {@link Map} at `globalThis[Symbol.for('@w5s/storage')]`.
 * This storage is persistent through hot module reload and shared across modules.
 *
 * @example
 * ```typescript
 * const key = Symbol('someKey');
 * if (!globalStorage.has(key)) {
 *   globalStorage.set(key, ['foo', 'bar']);
 * }
 * globalStorage.get();// ['foo', 'bar']
 * ```
 */
export const globalStorage = useStorage(globalThis);
