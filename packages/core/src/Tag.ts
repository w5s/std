import { invariant } from '@w5s/invariant';
import { type Codec } from './Codec.js';
import { Type } from './Type.js';

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
  /**
   * Returns a new Tag module
   *
   * @example
   * ```ts
   * type Foo = string & Tag<'Foo'>;
   * const Foo = Tag.define<string, Foo>({
   *   hasInstance: (anyValue) => typeof anyValue === 'string',
   * });
   * ```
   */
  define<From, To extends From>(parameters: Tag.Parameters<To>): Tag.Module<From, To> {
    const TagType = Type.define<To>(parameters);

    function wrap(value: From): To {
      invariant(TagType.hasInstance(value), `Invalid ${TagType.typeName}`);
      return value;
    }

    function unwrap(value: To): From {
      return value as unknown as From;
    }

    return Object.assign((value: From) => wrap(value), {
      wrap,
      unwrap,
      ...TagType,
    });
  },
};
export namespace Tag {
  export interface Parameters<T> extends Type.Parameters<T> {}

  export interface Module<From, To extends From> extends Type<To>, Codec<To> {
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
