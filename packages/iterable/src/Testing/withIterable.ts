import type { ExpectFunction } from '@w5s/core-type';

export interface ExpectIterable {
  /**
   * Asserts that `[Symbol.iterator]()` always returns the same value
   */
  toBeIdemPotent(): void;

  /**
   * Asserts `[Symbol.iterator]()` emits the same values as `expected`
   *
   * @param expected
   */
  toHaveValues(expected: Array<unknown>): void;
}

/**
 * Return a specialized expect for {@link @w5s/iterable!Iterable}
 *
 * @example
 * ```typescript
 * const expectIterable = withIterable(expect);
 *
 * const someIterable: Iterable<any> = ...;
 * expectIterable(someIterable).toHaveValues([1]);
 * ```
 * @param expectFn the expect function from the test library
 */
export function withIterable(expectFn: ExpectFunction) {
  const create = <V>(iterable: Iterable<V>, isNot: boolean): ExpectIterable => ({
    toBeIdemPotent() {
      const expectValue = expectFn([...iterable]);
      (isNot ? expectValue.not : expectValue).toEqual([...iterable]);
    },
    toHaveValues(expected: Array<unknown>) {
      const expectValue = expectFn([...iterable]);
      (isNot ? expectValue.not : expectValue).toEqual(expected);
    },
  });
  return <V>(iterable: Iterable<V>) =>
    Object.assign(create(iterable, false), {
      not: create(iterable, true),
    });
}
