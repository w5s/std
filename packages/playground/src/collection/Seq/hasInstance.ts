import { hasInstance as isIterable } from '../../iterable/Iterable/hasInstance.js';
import type { Seq } from '../Seq.js';
import { iterable } from './iterable.js';

/**
 * Returns `true` if `anyValue` is a `Seq`
 *
 * @example
 * ```typescript
 * Seq.hasInstance([1, 2, 3]); // == false
 * Seq.hasInstance(Seq([1, 2, 3])); // == true
 * ```
 * @param anyValue - any value to check
 */
export function hasInstance(anyValue: unknown): anyValue is Seq<unknown> {
  return isIterable(anyValue) && iterable in anyValue;
}
