/**
 * A function that takes any kind of parameters and returns anything
 *
 * @example
 * ```ts
 * function decorate<F extends AnyFunction>(fn: F): F {
 *   // ...
 * }
 * ```
 */
export type AnyFunction = (...args: any[]) => any;
