/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-plusplus */
import type { ExpectFunction } from '@w5s/core-type';

async function __fromAsync(iterable: any, mapFn: any = (_: any) => _) {
  const returnValue: globalThis.Array<any> = [];
  let index = 0;

  if (Symbol.asyncIterator in iterable) {
    for await (const item of iterable) {
      returnValue.push(await mapFn(item, index++));
    }
  } else {
    for (const item of iterable) {
      // eslint-disable-next-line no-await-in-loop
      returnValue.push(await mapFn(await item, index++));
    }
  }
  return returnValue;
}

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
      const expectValue = expectFn(__fromAsync(iterable)).resolves;
      return (isNot ? expectValue.not : expectValue).toEqual(expected);
    },
    async toBeIdemPotent() {
      const expectValue = expectFn(__fromAsync(iterable)).resolves;
      return (isNot ? expectValue.not : expectValue).toEqual(await __fromAsync(iterable));
    },
  });
  return <V>(iterable: AsyncIterable<V>) =>
    Object.assign(create(iterable, false), {
      not: create(iterable, true),
    });
}
