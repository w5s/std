import type { Order, OrderLike } from '../Order.js';

/**
 * Return a new {@link Order} function that will map the parameters using `selectFn`
 *
 * @category Constructor
 * @example
 * ```typescript
 * const compareByName = Order.compareBy((named: { name: string }) => named.name, String.compare);
 * ```
 * @param selector - A function that takes a `From` value and returns a `To` value.
 * @param compareTo - An {@link Order} function.
 */
export function compareBy<From, To>(selector: (from: To) => From, compareTo: OrderLike<From>): Order<To> {
  const compareFn = typeof compareTo === 'function' ? compareTo : compareTo.compare;
  return (left, right) => compareFn(selector(left), selector(right));
}
