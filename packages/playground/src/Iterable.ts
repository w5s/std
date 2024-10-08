import type { Int } from '@w5s/core';

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

  /**
   * Create an iterable of given `values`
   *
   * @example
   * ```typescript
   * Iterable.of('a', 'b', 'c');// 'a', 'b', 'c'
   * ```
   * @category Constructor
   * @param values - The values of the iterable
   */
  of<Value>(...values: Value[]): Iterable<Value> {
    return fromFunction(values[Symbol.iterator].bind(values));
  },

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
   * Create an iterable from `start` to `end` (excluded)
   *
   * @example
   * ```typescript
   * Iterable.range(1, 4);// == Iterable.of(1, 2, 3)
   * Iterable.range(1, 7, 2);// == Iterable.of(1, 3, 5)
   * ```
   * @param start - inclusive minimum
   * @param end - exclusive maximum value
   * @param step - optional step between iteration
   */
  range(start: number, end: number, step?: number): Iterable<number> {
    const incrementValue = Math.abs(step ?? 1);

    return fromFunction<number>(
      start < end
        ? () => {
            let currentValue = start;

            return {
              next() {
                const returnValue = currentValue;
                if (returnValue < end) {
                  currentValue += incrementValue;

                  return resultValue(returnValue);
                }

                return resultDone;
              },
            };
          }
        : () => {
            let currentValue = start;

            return {
              next() {
                const returnValue = currentValue;
                if (returnValue > end) {
                  currentValue -= incrementValue;

                  return resultValue(returnValue);
                }

                return resultDone;
              },
            };
          },
    );
  },

  /**
   * Return a new Iterable which applies `mapFn` to each values
   *
   * @example
   * ```typescript
   * const iterable = [1, 2, 3];
   * Iterable.map(iterator, (value) => value * 2);// == Iterable.of(2, 4, 6)
   * ```
   * @param source - the iterable source
   * @param mapFn - a function that returns a new value
   */
  map<ValueFrom, ValueTo>(source: Iterable<ValueFrom>, mapFn: (value: ValueFrom) => ValueTo): Iterable<ValueTo> {
    return fromFunction(() => {
      const sourceIterator = getIterator(source);

      return {
        next() {
          const result = sourceIterator.next();

          return result.done === true ? result : resultValue(mapFn(result.value));
        },
      };
    });
  },

  /**
   * Return a new iterator that filters values using `predicate`
   *
   * @example
   * ```typescript
   * const iterator = [1, 2, 3];
   * Iterable.filter(iterator, (value) => value > 1);// == Iterable.of(2, 3)
   * ```
   * @param source - the iterator to be filtered
   * @param predicate - a function that returns a boolean
   */
  filter<Value>(source: Iterable<Value>, predicate: (value: Value) => boolean): Iterable<Value> {
    return fromFunction(() => {
      const sourceIterator = getIterator(source);

      return {
        next() {
          let result: IteratorResult<Value>;
          do {
            result = sourceIterator.next();
          } while (result.done !== true && !predicate(result.value));

          return result;
        },
      };
    });
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

  /**
   * Combine two iterables into an iterable of couple of their values.
   * The result has the size of the smallest iterable used.
   *
   * @example
   * ```typescript
   * const left = [1, 2, 3];
   * const right = ['a', 'b'];
   * Iterable.zip(left, right);// == Iterable.of([1, 'a'], [2, 'b'])
   * ```
   * @param left - Left iterable
   * @param right - Right iterable
   */
  zip<L, R>(left: Iterable<L>, right: Iterable<R>): Iterable<[L, R]> {
    return fromFunction<[L, R]>(() => {
      const leftIterator = getIterator(left);
      const rightIterator = getIterator(right);

      return {
        next() {
          const leftResult = leftIterator.next();
          const rightResult = rightIterator.next();

          return leftResult.done === true || rightResult.done === true
            ? resultDone
            : resultValue([leftResult.value, rightResult.value] as [L, R]);
        },
      };
    });
  },
};
