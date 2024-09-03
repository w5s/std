import type { Callable } from './Callable.js';
import type { Codec } from './Codec.js';
import { define } from './Tag/define.js';
import type { Type } from './Type.js';

/**
 * Enhance `Base` by adding tags. Every tag is prefixed by `@@` as a convention to never be used by runtime code
 *
 * @example
 * ```typescript
 * type PositiveNumber = number & Tag<{ positive: true }>;
 * const isPositive = (n: number): n is PositiveNumber => n >= 0;
 * const squareRoot = (n: PositiveNumber): PositiveNumber => Math.sqrt(n) as PositiveNumber;
 * const value = 0;
 * squareRoot(value); // tsc: Error
 * if (isPositive(value)) {
 *   squareRoot(value); // tsc: Passed
 * }
 * ```
 */
export interface Tag<T extends string | symbol> {
  readonly '@@tag': {
    readonly [K in T]: K;
  };
}

/**
 * @namespace
 */
export const Tag = {
  define,
};
export namespace Tag {
  export interface Parameters<T> extends Type.Parameters<T> {}

  export interface Module<From, To extends From> extends Type<To>, Codec<To>, Callable<(value: From) => To> {
    /**
     * Convert an underlying type to a tagged type
     * Alias to `wrap(value)`
     *
     * @param value
     */
    (value: From): To;
    /**
     * Convert an underlying type to a tagged type
     *
     * @param value
     */
    wrap(value: From): To;
    /**
     * Convert a tagged value to the underlying type
     *
     * @param value
     */
    unwrap(value: To): From;
  }
}
