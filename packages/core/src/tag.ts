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
   * const Foo = Tag.Make<string, Foo>();
   * ```
   */
  Make<From, To extends Tag<any>>() {
    function wrap(value: From): To {
      return value as unknown as To;
    }

    function unwrap(value: To): From {
      return value as unknown as From;
    }

    return {
      wrap,
      unwrap,
    };
  },
};
