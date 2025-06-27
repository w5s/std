/**
 * Creates a new object by excluding the specified keys from the provided object.
 *
 * @example
 * ```typescript
 * const object = { foo: true, bar: true, baz: true };
 * omit(object, ['foo']); // {  bar: true, baz: true };
 * omit(object, ['foo', 'bar']); // { baz: true };
 * console.log(object); // > { foo: true, bar: true, baz: true }; (unchanged)
 * ```
 *
 * @param self - the object
 * @param keys - the keys to exclude
 */
export function omit<T extends object, K extends keyof T>(self: Readonly<T>, keys: readonly K[]): Omit<T, K> {
  const excludes = new Set(keys);
  const returnValue: object = {};
  for (const [key, value] of Object.entries(self)) {
    if (!excludes.has(key as K)) {
      // @ts-ignore This is correct
      returnValue[key] = value;
    }
  }

  return returnValue as Omit<T, K>;
}
