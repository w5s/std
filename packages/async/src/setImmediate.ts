import type { ImmediateId } from './ImmediateId.js';
import { globalSetImmediate } from './internal/globalSetImmediate.js';

/**
 * A polyfill for {@link setImmediate}
 *
 * @example
 * ```typescript
 * const id = setImmediate(() => console.log('Hello World!'));
 * ```
 * @param callback the function to call
 */
export function setImmediate(callback: () => void): ImmediateId {
  return globalSetImmediate(callback) as ImmediateId;
}
