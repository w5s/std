import type { Order } from '../Order.js';

/**
 *
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 * const comparePerson = Order.combine(
 *   (left: Person, right: Person) => String.compare(left.name, right.name),
 *   (left: Person, right: Person) => Number.compare(left.age, right.age),
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
