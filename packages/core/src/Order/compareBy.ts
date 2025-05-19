import type { Order } from '../Order.js';

/**
 * Return a new {@link @w5s/core!Order} function that will map the parameters using `selectFn`
 *
 * @example
 * ```typescript
 * const compareByName = compareBy(String.compare, (named: { name: string }) => named.name);
 * ```
 * @param self - A {@link @w5s/core!Order} function.
 * @param selectFn - A function that takes a `From` value and returns a `To` value.
 */
export function compareBy<From, To>(self: Order<From>, selectFn: (from: To) => From): Order<To> {
  return (left, right) => self(selectFn(left), selectFn(right));
}
