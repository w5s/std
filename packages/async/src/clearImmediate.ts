import type { ImmediateId } from './ImmediateId.js';
import { globalClearImmediate } from './internal/globalClearImmediate.js';

/**
 * A polyfill for {@link clearImmediate}
 *
 * @example
 * ```typescript
 * const id = setImmediate(() => { ... });
 * clearImmediate(id);// This will cancel the call
 * ```
 * @param id the id returned by `setImmediate`
 */
export function clearImmediate(id: ImmediateId): void {
  return globalClearImmediate(id);
}
