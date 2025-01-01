/**
 * Flatten the type. Useful for IDE information.
 *
 * @example
 * ```typescript
 * type A = { a: boolean };
 * type B = { b: string };
 * type AB = Pretty<A & B>; // { a: boolean; b: string; }
 * ```
 */
export type Pretty<T> = { [KeyType in keyof T]: T[KeyType] } & {};
