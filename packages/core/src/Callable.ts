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
export function Callable<T extends Callable<AnyFunction>>(properties: T): CallableFunction<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
  return Object.assign((...args: any) => properties[Callable.symbol](...args), properties);
}
export namespace Callable {
  /**
   * Alias to {@link @w5s/core!Symbol.toFunction}
   */
  export const symbol: (typeof Symbol)['toFunction'] = Symbol.toFunction;
}
