import type { ExpectFunction } from '@w5s/core-type';
import type { Order } from '../Order.js';

export interface ExpectOrder {
  /**
   * Asserts that the ordered values are in the correct order using the provided compare function.
   *
   * @param orderedValues - the ordered values that should be compared
   */
  toSortValues(orderedValues: Array<any>): void;
}

/**
 * Return a specialized expect for {@link @w5s/core#Order}
 *
 * @example
 * ```typescript
 * const expectOrder = withOrder(expect);
 *
 * expectOrder(Number.compare).toSortValues([1, 2, 3]);
 * ```
 * @param expectFn - the expect function from the test library
 */
export function withOrder(expectFn: ExpectFunction) {
  const create = <T>(order: Order<T>, isNot: boolean): ExpectOrder => ({
    toSortValues(orderedValues: Array<T>) {
      const expectValue = expectFn(orderedValues.concat().sort(order));
      return (isNot ? expectValue.not : expectValue).toEqual(orderedValues);
    },
  });

  return <T>(order: Order<T>) =>
    Object.assign(create(order, false), {
      not: create(order, true),
    });
}
