import type { Array } from '../Array.js';

/**
 * Alias to `Array.isArray()`
 *
 * @example
 * ```typescript
 * Array.hasInstance(Array.empty()) // true
 * Array.hasInstance(null)) // false
 * ```
 * @category Type
 * @param anyValue - a tested value
 */
export function hasInstance(anyValue: unknown): anyValue is Array<unknown> {
  return globalThis.Array.isArray(anyValue);
}
