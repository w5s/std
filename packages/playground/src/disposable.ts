import { Symbol } from '../../core/src/symbol.js';

/**
 * An interface for an object with resources that can be released synchronously
 */
export interface Disposable {
  /**
   * Disposes of resources within this object.
   */
  [Symbol.dispose](): void;
}

/**
 * @namespace
 */
export const Disposable = {
  /**
   * Returns `true` if `anyValue` is a valid {@link Disposable}
   *
   * @example
   * ```typescript
   * Disposable.hasInstance({});// false
   * Disposable.hasInstance({ [Symbol.dispose]: () => {} });// true
   * ```
   * @category Type
   * @param anyValue - the value to tested
   */
  hasInstance(anyValue: unknown): anyValue is Disposable {
    return isObject(anyValue) && typeof anyValue[Symbol.dispose] === 'function';
  },
};

/**
 * An interface for an object with resources that can be released asynchronously
 */
export interface AsyncDisposable {
  /**
   * Disposes of resources within this object.
   */
  [Symbol.asyncDispose](): Promise<void>;
}

/**
 * @namespace
 */
export const AsyncDisposable = {
  /**
   * Returns `true` if `anyValue` is a valid {@link AsyncDisposable}
   *
   * @example
   * ```typescript
   * AsyncDisposable.hasInstance({});// false
   * AsyncDisposable.hasInstance({ [Symbol.asyncDispose]: () => {} });// true
   * ```
   * @category Type
   * @param anyValue - the value to tested
   */
  hasInstance(anyValue: unknown): anyValue is AsyncDisposable {
    return isObject(anyValue) && typeof anyValue[Symbol.asyncDispose] === 'function';
  },
};

// utils
function isObject(anyValue: unknown): anyValue is Record<string | symbol, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
