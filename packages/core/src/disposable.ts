import { Symbol } from './symbol.js';

export interface Disposable {
  /**
   * Disposes of resources within this object.
   */
  [Symbol.dispose](): void;
}
export namespace Disposable {
  /**
   * Returns `true` if `anyValue` is a valid {@link Disposable}
   *
   * @example
   * ```typescript
   * Disposable.hasInstance({});// false
   * Disposable.hasInstance({ [Symbol.dispose]: () => {} });// true
   * ```
   * @category Guard
   * @param anyValue - the value to tested
   */
  export function hasInstance(anyValue: unknown): anyValue is Disposable {
    return isObject(anyValue) && typeof anyValue[Symbol.dispose] === 'function';
  }
}

export interface AsyncDisposable {
  /**
   * Disposes of resources within this object.
   */
  [Symbol.asyncDispose](): Promise<void>;
}
export namespace AsyncDisposable {
  /**
   * Returns `true` if `anyValue` is a valid {@link AsyncDisposable}
   *
   * @example
   * ```typescript
   * AsyncDisposable.hasInstance({});// false
   * AsyncDisposable.hasInstance({ [Symbol.asyncDispose]: () => {} });// true
   * ```
   * @category Guard
   * @param anyValue - the value to tested
   */
  export function hasInstance(anyValue: unknown): anyValue is AsyncDisposable {
    return isObject(anyValue) && typeof anyValue[Symbol.asyncDispose] === 'function';
  }
}

// utils
function isObject(anyValue: unknown): anyValue is Record<string | symbol, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
