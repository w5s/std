import type { Int } from '@w5s/core';
import { of } from './Iterable/of.js';
import { filter } from './Iterable/filter.js';
import { map } from './Iterable/map.js';
import { zip } from './Iterable/zip.js';

const resultDone: IteratorResult<any> = Object.freeze({ done: true, value: undefined });
const resultValue = <V>(value: V) => ({ value, done: false });
const fromFunction = <Value>(iteratorFn: () => Iterator<Value>): Iterable<Value> => ({
  [Symbol.iterator]: iteratorFn,
});
const getIterator = <Value>(iterable: Iterable<Value>) => iterable[Symbol.iterator]();
const emptyIterator = { next: () => resultDone };
const emptyIterable = fromFunction<never>(() => emptyIterator);

/**
 * A collection of functions to manipulate Iterable
 *
 * @example
 * ```typescript
 * import { Iterable } from '@w5s/core';
 *
 * const iterable = Iterable.create(() => ({
 *   next() { ... }
 * }))
 * ```
 * @namespace
 */
export const Iterable = {
  /**
   * Iterable constructor
   *
   * @example
   * ```typescript
   * const iterable = Iterable.create(() => ({
   *   next() { ... }
   * }))
   * ```
   * @category Constructor
   * @param iteratorFn - function that creates a new iterator
   */
  create<Value>(iteratorFn: () => Iterator<Value>): Iterable<Value> {
    return fromFunction(iteratorFn);
  },

  /**
   * Return a new iterator from iterable
   *
   * @example
   * ```typescript
   * const iterable = [1, 2, 3];
   * const iterator = Iterable.iterator(iterable);// { next () { 1, 2, 3, done } }
   * ```
   * @category Accessor
   * @param iterable - an object that have `[Symbol.iterator]`
   */
  iterator<Value>(iterable: Iterable<Value>) {
    return iterable[Symbol.iterator]();
  },

  /**
   * Returns an iterable that have no value
   *
   * @example
   * ```typescript
   * Array.from(Iterable.empty()) // == []
   * ```
   * @category Constructor
   */
  empty() {
    return emptyIterable;
  },
  of,
  filter,
  map,
  zip,

  /**
   * Generate an iterable of `length` using `mapFn(index)` on each element
   *
   * @example
   * ```typescript
   * Iterable.generate(3, () => 'a');// == Iterable.of('a', 'a', 'a')
   * Iterable.generate(3, (index) => index * 2);// == Iterable.of(0, 2, 4)
   * ```
   * @category Constructor
   * @param length - The number of elements
   * @param mapFn - The mapping function
   */
  generate<Value>(length: number, mapFn: (index: Int) => Value): Iterable<Value> {
    return length === 0
      ? emptyIterable
      : fromFunction<Value>(() => {
          let currentIndex = 0;

          return {
            next() {
              const index = currentIndex;
              if (index < length) {
                currentIndex += 1;

                return resultValue(mapFn(index as Int));
              }

              return resultDone;
            },
          };
        });
  },

  /**
   * Returns `true` if `anyValue` is a valid {@link Iterable}
   *
   * @example
   * ```typescript
   * Iterable.hasInstance({});// false
   * Iterable.hasInstance([]);// true
   * Iterable.hasInstance({ [Symbol.iterable]: () => ({ next: () => ({ done: true }) }) });// true
   * ```
   * @category Type
   * @param anyValue - the value to tested
   */
  hasInstance(anyValue: unknown): anyValue is Iterable<unknown> {
    return (
      anyValue !== null &&
      typeof anyValue === 'object' &&
      typeof (anyValue as unknown as Record<string | symbol, unknown>)[Symbol.iterator] === 'function'
    );
  },
  /**
   * Reduce an `initialValue` to the `reducer` function
   *
   * @example
   * ```typescript
   * const iterable = [1, 2, 3];
   * Iterable.reduce(iterable, (total, value) => total + value, 0);// 6
   * ```
   * @param source - the iterator reduced
   * @param reducer - the reducer function
   * @param initialValue - the initial value passed to the reducer
   */
  reduce<Value, Return>(
    source: Iterable<Value>,
    reducer: (accumulator: Return, value: Value) => Return,
    initialValue: Return,
  ): Return {
    const sourceIterator = getIterator(source);
    let result: IteratorResult<Value>;
    let currentValue = initialValue;

    // eslint-disable-next-line no-constant-condition,@typescript-eslint/no-unnecessary-condition
    while (true) {
      result = sourceIterator.next();
      if (result.done === true) {
        break;
      }
      currentValue = reducer(currentValue, result.value);
    }

    return currentValue;
  },
};
