import type { Order } from '../Order.js';

/**
 *
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 * const comparePerson = Order.combine<Person>(
 *   // 1. Compare by name (ascending)
 *   Order.compareBy((person) => person.name, String.compare),
 *   // 2. Compare by age (ascending)
 *   Order.compareBy((person) => person.age, Number.compare),
 * );
 * ```
 * @param self
 * @param others
 */
export function combine<T>(self: Order<T>, ...others: Order<T>[]): Order<T> {
  return (left, right) => {
    let returnValue = self(left, right);
    if (returnValue !== 0) {
      return returnValue;
    }
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < others.length; index += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      returnValue = others[index]!(left, right);
      if (returnValue !== 0) {
        return returnValue;
      }
    }

    return returnValue;
  };
}
