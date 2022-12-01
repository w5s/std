/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * @example
 * ```ts
 * shallowEqual(true, true);// true
 * shallowEqual(NaN, NaN);// true
 * shallowEqual({ a: 1 }, { a: 1 });// true
 * shallowEqual(anyObject, anyObject);// true
 * ```
 * @param left - the left operand
 * @param right  - the right operand
 * @param equalFn - the property equality function
 */
export function shallowEqual<T = unknown>(
  left: T,
  right: T,
  equalFn?: (left: any, right: any, key: keyof T) => boolean
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
  const rightHasOwnProperty = Object.prototype.hasOwnProperty.bind(right);

  if (equalFn == null) {
    // Test for A's keys different from B.
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < leftKeys.length; index += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const key = leftKeys[index]!;

      if (
        !rightHasOwnProperty(key) ||
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

      if (!rightHasOwnProperty(key)) {
        return false;
      }

      // @ts-ignore Wrong typing
      if (!equalFn(left[key], right[key], key)) {
        return false;
      }
    }
  }

  return true;
}
