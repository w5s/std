import { of } from './of.js';

/**
 * Returns an iterable that have no value
 *
 * @example
 * ```typescript
 * Array.from(AsyncIterable.empty()) // == []
 * ```
 * @category Constructor
 */
export function empty<Value = never>(): AsyncIterable<Value> {
  return of();
}
