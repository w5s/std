import { of } from './of.js';

/**
 * Returns an iterable that have no value
 *
 * @example
 * ```typescript
 * Array.from(Iterable.empty()) // == []
 * ```
 * @category Constructor
 */
export function empty<Value = never>(): Iterable<Value> {
  return of();
}
