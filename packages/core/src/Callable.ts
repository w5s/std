import { Symbol } from './Symbol.js';

/**
 * Return a new function from callable interface
 *
 * @example
 * ```ts
 * const myCallable = Callable({
 *   [Callable.symbol]: (arg: number) => arg,
 *   myMethod: () => {},
 * });
 * // myCallable(1)
 * // myCallable.myMethod();
 *
 * ```
 * @param properties
 */
export function Callable<T extends { [Callable.symbol]: (...args: any[]) => any }>(
  properties: T
): T[typeof Callable.symbol] & T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
  return Object.assign((...args: any) => properties[Callable.symbol](...args), properties);
}
export namespace Callable {
  /**
   * Alias to {@link @w5s/core!Symbol.call}
   */
  export const symbol: (typeof Symbol)['call'] = Symbol.call;
}
