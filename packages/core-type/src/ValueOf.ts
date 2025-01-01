/**
 * Extract all values from the keys `Keys` of `T`. If `Keys` is omitted, all keys are used.
 *
 * @example
 * ```typescript
 * type AllValues = ValueOf<{ Foo: boolean; Bar: 'bar'; Baz: 'baz' }> // 'bar' | 'baz' | boolean
 * type SomeValues = ValueOf<{ Foo: boolean; Bar: 'bar'; Baz: 'baz' }, 'Baz' | 'Bar'> // 'bar' | 'baz'
 * ```
 */
export type ValueOf<T, Keys extends keyof T = keyof T> = T[Keys];
