import type { ExpectFunction } from '@w5s/core-type';
import { fromAsync as arrayFromAsync } from '@w5s/collection/dist/Array/fromAsync.js';

export interface ExpectAsyncIterable {
  /**
   * Asserts `[Symbol.iterator]()` emits the same values as `expected`
   *
   * @param expected
   */
  toHaveValues(expected: Array<unknown>): Promise<void>;
  /**
   * Asserts that `[Symbol.iterator]()` always returns the same value
   */
  toBeIdemPotent(): Promise<void>;
}

/**
 * Return a specialized expect for {@link @w5s/iterable!AsyncIterable}
 *
 * @example
 * ```typescript
 * const expectAsyncIterable = withAsyncIterable(expect);
 *
 * const someIterable: AsyncIterable<any> = ...;
 * await expectAsyncIterable(someIterable).toHaveValues([1]);
 * ```
 * @param expectFn - the expect function from the test library
 */
export function withAsyncIterable(expectFn: ExpectFunction) {
  const create = <V>(iterable: AsyncIterable<V>, isNot: boolean): ExpectAsyncIterable => ({
    async toHaveValues(expected: Array<unknown>) {
      const expectValue = expectFn(arrayFromAsync(iterable)).resolves;
      return (isNot ? expectValue.not : expectValue).toEqual(expected);
    },
    async toBeIdemPotent() {
      const expectValue = expectFn(arrayFromAsync(iterable)).resolves;
      return (isNot ? expectValue.not : expectValue).toEqual(await arrayFromAsync(iterable));
    },
  });
  return <V>(iterable: AsyncIterable<V>) =>
    Object.assign(create(iterable, false), {
      not: create(iterable, true),
    });
}
