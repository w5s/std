import { __hasOwn } from './__hasOwn.js';

/**
 * Creates a new object by including the specified keys from provided object.
 *
 * @example
 * ```typescript
 * const object = { foo: true, bar: true, baz: true };
 * pick(object, [ 'foo' ]); // { foo: true, };
 * console.log(object); // > { foo: true, bar: true, baz: true }; (unchanged)
 * ```
 *
 * @param self - The object
 * @param keys - The keys to pick in the new object.
 */
export function pick<T extends object, K extends keyof T>(self: Readonly<T>, keys: readonly K[]): Pick<T, K> {
  const returnValue: object = {};
  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (typeof key !== 'function' && key != null && __hasOwn(self, key)) {
      // @ts-ignore This is correct
      returnValue[key] = self[key];
    }
  }
  return returnValue as Pick<T, K>;
}
