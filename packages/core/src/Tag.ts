import { invariant } from '@w5s/invariant';
import { DecodeError, type Codec } from './Codec.js';

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
   * const Foo = Tag.Make<string, Foo>({
   *   hasInstance: (anyValue) => typeof anyValue === 'string',
   * });
   * ```
   */
  Make<From, To extends From>(parameters: {
    displayName?: string;
    hasInstance: (anyValue: unknown) => boolean;
  }): Tag.Module<From, To> {
    const { displayName, hasInstance: _hasInstance } = parameters;

    function wrap(value: From): To {
      invariant(hasInstance(value), `Invalid ${displayName}`);
      return value;
    }

    function unwrap(value: To): From {
      return value as unknown as From;
    }

    function hasInstance(value: unknown): value is To {
      return _hasInstance(value);
    }

    const TagCodec: Codec<To> = {
      codecEncode: (value) => value,
      codecDecode: (value) =>
        hasInstance(value)
          ? { _: 'Ok', ok: true, value }
          : {
              _: 'Error',
              ok: false,
              error: DecodeError({
                message: `Invalid ${displayName}`,
                input: value,
              }),
            },
      codecSchema: () => ({}),
    };

    return Object.assign((value: From) => wrap(value), {
      displayName,
      wrap,
      unwrap,
      hasInstance,
      ...TagCodec,
    });
  },
};
export namespace Tag {
  export interface Module<From, To extends From> extends Codec<To> {
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
    /**
     * Check if `value` is a tagged type and refine type
     *
     * @param value
     */
    hasInstance(value: unknown): value is To;
  }
}
