import type { Seq } from '../Seq.js';
import { from } from './from.js';

/**
 * Return a new sequence from `values`
 *
 * @example
 * ```typescript
 * Seq.of(1, 2, 3); // A sequence of 1, 2, 3
 * ```
 * @param values - values to be converted to a sequence
 */
export function of<T>(...values: T[]): Seq<T> {
  return from(values);
}
