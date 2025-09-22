import type { AnyFunction } from '@w5s/core-type';
import { Symbol } from './Symbol.js';

/**
 * A callable function with callable interface
 */
export type CallableFunction<T extends Callable<AnyFunction>> = T[typeof Callable.symbol] & T;

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
  // eslint-disable-next-line @typescript-eslint/no-shadow, prefer-arrow-callback
  function Callable<T extends Callable<AnyFunction>>(properties: T): CallableFunction<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
    return Object.assign((...args: any) => properties[Symbol.call](...args), properties);
  },
  {
    /**
     * Alias to {@link @w5s/core!Symbol.call}
     */
    symbol: Symbol.call as Symbol.call,
  },
);
