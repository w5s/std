import { Seq } from '../Seq.js';
import { Seq as SeqImplementation } from './Seq.js';

/**
 * Return a new sequence from `iterable`
 *
 * @example
 * ```typescript
 * Seq.from([1, 2, 3]); // A sequence of 1, 2, 3
 * Seq.from(Iterable.of(1, 2, 3)); // A sequence of 1, 2, 3
 * ```
 * @param iterable
 */
export function from<T>(iterable: Iterable<T>): Seq<T> {
  return new SeqImplementation(iterable);
}
