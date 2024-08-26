/**
 * A type that can be either `undefined`, `null`, or `T`
 *
 * @example
 * ```ts
 * type NullableNumber = Nullable<number>;
 *
 * function someFunction(value: NullableNumber) {
 *   // value is number | undefined | null
 * }
 * ```
 */
export type Nullable<T = never> = null | undefined | T;
