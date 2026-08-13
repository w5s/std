/* eslint-disable ts/prefer-for-of */
type KeyOf<T> = T extends Array<unknown> ? number : keyof T;
type ValueOf<T> = T extends Array<infer V> ? V : T[keyof T];

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
 * @param left the left operand
 * @param right the right operand
 * @param equalValueFn the property equality function
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

    for (let index = 0; index < leftKeys.length; index += 1) {
      // eslint-disable-next-line ts/no-non-null-assertion
      const key = leftKeys[index]!;

      const leftValue = left[key as keyof typeof left] as ValueOf<T>;
      const rightValue = right[key as keyof typeof right] as ValueOf<T>;

      if (!Object.hasOwn(right, key) || !objectIs(leftValue, rightValue)) {
        return false;
      }
    }
  } else {
    // Test for A's keys different from B.

    for (let index = 0; index < leftKeys.length; index += 1) {
      // eslint-disable-next-line ts/no-non-null-assertion
      const key = leftKeys[index]!;

      if (!Object.hasOwn(right, key)) {
        return false;
      }

      const leftValue = left[key as keyof typeof left] as ValueOf<T>;
      const rightValue = right[key as keyof typeof right] as ValueOf<T>;
      const typedKey = key as KeyOf<T>;

      if (!equalValueFn(leftValue, rightValue, typedKey)) {
        return false;
      }
    }
  }

  return true;
}
