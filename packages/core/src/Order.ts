import type { Ordering } from './Ordering.js';
import { reverse } from './Order/reverse.js';
import { combine } from './Order/combine.js';
import { compareBy } from './Order/compareBy.js';
import { primitive } from './Order/primitive.js';
import type { Comparable } from './Comparable.js';

/**
 * Return an {@link Ordering} thats represents the comparison result
 *
 * @param left - left side operand
 * @param right - left side operand
 */
export type Order<T> = (left: T, right: T) => Ordering;

/**
 * A type that is an Order or Comparable with only compare property required
 */
export type OrderLike<T> = Order<T> | Pick<Comparable<T>, 'compare'>;

/**
 * @namespace
 */
export const Order = {
  compareBy,
  combine,
  primitive,
  reverse,
};
