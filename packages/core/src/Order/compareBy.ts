import type { Comparable } from '../Comparable.js';
import type { Order } from '../Order.js';

/**
 * Return a new {@link @w5s/core!Order} function that will map the parameters using `selectFn`
 *
 * @category Constructor
 * @example
 * ```typescript
 * const compareByName = compareBy((named: { name: string }) => named.name, String.compare);
 * ```
 * @param selector - A function that takes a `From` value and returns a `To` value.
 * @param compareTo - A {@link @w5s/core!Order} function.
 */
export function compareBy<From, To>(
  selector: (from: To) => From,
  compareTo: Order<From> | Comparable<From>,
): Order<To> {
  const compareFn = typeof compareTo === 'function' ? compareTo : compareTo.compare;
  return (left, right) => compareFn(selector(left), selector(right));
}
