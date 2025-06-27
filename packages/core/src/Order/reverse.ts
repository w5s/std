import type { Order, OrderLike } from '../Order.js';
import { reverse as orderingReverse } from '../Ordering/reverse.js';

/**
 * Returns a reversed {@link Order} from the given {@link Order} or {@link Comparable}.
 *
 * @example
 * ```typescript
 * Order.reverse(Number.compare); // == (left, right) => Ordering.reverse(Number.compare(left, right))
 * Order.reverse(Number); // == reverse(Number.compare)
 * ```
 * @param self - the comparator function or comparable object to be reversed.
 */
export function reverse<T>(self: OrderLike<T>): Order<T> {
  const compareFn = typeof self === 'function' ? self : self.compare;
  return (left, right) => orderingReverse(compareFn(left, right));
}
