import type { AnyFunction } from '@w5s/core-type';

import { Symbol } from './Symbol.js';

/**
 * Callable interface
 */
export interface Callable<F extends AnyFunction = AnyFunction> {
  /**
   * Callable property
   *
   * @category Callable
   */
  [Callable.symbol]: F;
}

/**
 * A callable function with callable interface
 */
export type CallableFunction<T extends Callable<AnyFunction>> = T & T[typeof Callable.symbol];

/**
 * @namespace
 */
export const Callable = Object.assign(
  /**
   * Return a new function from callable interface
   *
   * @example
   * ```typescript
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

  function createCallable<T extends Callable<AnyFunction>>(properties: T): CallableFunction<T> {
    const call = properties[Symbol.call] as (...args: Array<unknown>) => unknown;
    const callable = ((...args: Array<unknown>) => call(...args)) as CallableFunction<T>;
    const assigned = Object.assign(callable, properties) as unknown as CallableFunction<T>;
    return assigned;
  },
  {
    /**
     * Alias to {@link @w5s/core!Symbol.call}
     */
    symbol: Symbol.call,
  },
);
