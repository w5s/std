import type { AnyFunction } from '@w5s/core-type';
import { Symbol } from './Symbol.js';

/**
 * Callable interface
 */
export interface Callable<F extends AnyFunction = AnyFunction> {
  /**
   * Callable property
   */
  [Callable.symbol]: F;
}
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
export function Callable<T extends Callable<AnyFunction>>(properties: T): T[typeof Callable.symbol] & T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
  return Object.assign((...args: any) => properties[Callable.symbol](...args), properties);
}
export namespace Callable {
  /**
   * Alias to {@link @w5s/core!Symbol.call}
   */
  export const symbol: (typeof Symbol)['call'] = Symbol.call;
}
