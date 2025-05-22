import type { Comparable } from '../Comparable.js';
import type { Order } from '../Order.js';
import { reverse as orderingReverse } from '../Ordering/reverse.js';

/**
 * Returns a reversed {@link Order} from the given {@link Order} or {@link Comparable}.
 *
 * @example
 * ```typescript
 * reverse(Number.compare); // == (left, right) => Ordering.reverse(Number.compare(left, right))
 * reverse(Number); // == reverse(Number.compare)
 * ```
 * @param self - the comparator function or comparable object to be reversed.
 */
export function reverse<T>(self: Order<T> | Pick<Comparable<T>, 'compare'>): Order<T> {
  const compareFn = typeof self === 'function' ? self : self.compare;
  return (left, right) => orderingReverse(compareFn(left, right));
}
