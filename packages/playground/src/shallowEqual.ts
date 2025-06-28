/* eslint-disable @typescript-eslint/no-non-null-assertion */

type ValueOf<T> = T extends Array<infer V> ? V : T[keyof T];
type KeyOf<T> = T extends Array<unknown> ? number : keyof T;

const __hasOwn =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn ?? ((object, propertyName) => Object.prototype.hasOwnProperty.call(object, propertyName));

/**
 * Returns `true` when left and right are strictly equal or have same properties
 *
 * @example
 * ```typescript
 * shallowEqual(true, true);// true
 * shallowEqual(NaN, NaN);// true
 * shallowEqual({ a: 1 }, { a: 1 });// true
 * shallowEqual({ a: 1 }, { a: 2 });// false
 * ```
 * @param left - the left operand
 * @param right  - the right operand
 * @param equalValueFn - the property equality function
 */
export function shallowEqual<T = unknown>(
  left: T,
  right: T,
  equalValueFn?: (left: ValueOf<T>, right: ValueOf<T>, key: KeyOf<T>) => boolean,
): boolean {
  const objectIs = Object.is;

  if (objectIs(left, right)) {
    return true;
  }
  if (typeof left !== 'object' || left === null || typeof right !== 'object' || right === null) {
    return false;
  }
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  if (equalValueFn == null) {
    // Test for A's keys different from B.
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < leftKeys.length; index += 1) {
      const key = leftKeys[index]!;

      if (
        !__hasOwn(right, key) ||
        // @ts-ignore Wrong typing
        !objectIs(left[key], right[key])
      ) {
        return false;
      }
    }
  } else {
    // Test for A's keys different from B.
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < leftKeys.length; index += 1) {
      const key = leftKeys[index]!;

      if (!__hasOwn(right, key)) {
        return false;
      }

      // @ts-ignore Wrong typing
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (!equalValueFn(left[key], right[key], key)) {
        return false;
      }
    }
  }

  return true;
}
