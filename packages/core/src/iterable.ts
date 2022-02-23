/**
 * Iterable constructor
 *
 * @category Constructor
 * @param iterator function that creates a new iterator
 */
export function Iterable<Value>(iterator: () => Iterator<Value>) {
  return {
    [Symbol.iterator]: iterator,
  };
}
export namespace Iterable {
  const resultDone: IteratorResult<any> = Object.freeze({ done: true, value: undefined });
  const resultValue = <V>(value: V) => ({ value, done: false });
  const emptyIterator = { next: () => resultDone };
  const emptyIterable = Iterable(() => emptyIterator);

  /**
   * Return a new iterator from iterable
   *
   * @example
   * ```typescript
   * const iterable = [1, 2, 3];
   * const iterator = Iterable.iterator(iterable);// { next () { 1, 2, 3, done } }
   * ```
   * @category Accessor
   * @param iterable an object that have `[Symbol.iterator]`
   */
  export function iterator<Value>(iterable: Iterable<Value>) {
    return iterable[Symbol.iterator]();
  }

  /**
   * Returns an iterable that have no value
   *
   * @category Constructor
   */
  export function empty() {
    return emptyIterable;
  }

  /**
   * Create an iterable from `start` to `end` (excluded)
   *
   * @param start inclusive minimum
   * @param end exclusive maximum value
   * @param step optional step between iteration
   */
  export function range(start: number, end: number, step?: number): Iterable<number> {
    const incrementValue = Math.abs(step ?? 1);

    return Iterable(
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
          }
    );
  }

  // export function repeat() {}

  /**
   * Return a new Iterable which applies `mapFn` to each values
   *
   * @example
   * ```typescript
   * const iterable = [1, 2, 3];
   * Iterable.map(iterator, (value) => value * 2);// { next () { 2, 4, 6, done } }
   * ```
   * @param source the iterable source
   * @param mapFn a function that returns a new value
   */
  export function map<ValueFrom, ValueTo>(
    source: Iterable<ValueFrom>,
    mapFn: (value: ValueFrom) => ValueTo
  ): Iterable<ValueTo> {
    return Iterable(() => {
      const sourceIterator = iterator(source);

      return {
        next() {
          const result = sourceIterator.next();

          return result.done === true ? result : resultValue(mapFn(result.value));
        },
      };
    });
  }

  /**
   * Return a new iterator that filters values using `predicate`
   *
   * @example
   * ```typescript
   * const iterator = [1, 2, 3];
   * Iterable.filter(iterator, (value) => value > 1);// { next () { 2, 3, done } }
   * ```
   * @param source - the iterator to be filtered
   * @param predicate - a function that returns a boolean
   */
  export function filter<Value>(source: Iterable<Value>, predicate: (value: Value) => boolean): Iterable<Value> {
    return Iterable(() => {
      const sourceIterator = iterator(source);

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
  }

  /**
   * Reduce an `initialValue` to the `reducer` function
   *
   * @example
   * ```typescript
   * const iterable = [1, 2, 3];
   * Iterable.reduce(iterable, (total, value) => total + value, 0);// 6
   * ```
   * @param source the iterator reduced
   * @param reducer the reducer function
   * @param initialValue the initial value passed to the reducer
   */
  export function reduce<Value, Return>(
    source: Iterable<Value>,
    reducer: (accumulator: Return, value: Value) => Return,
    initialValue: Return
  ): Return {
    const sourceIterator = iterator(source);
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
  }

  /**
   * Combine two iterables into an iterable of couple of their values.
   * The result has the size of the smallest iterable used.
   *
   * @example
   * ```typescript
   * const left = [1, 2, 3];
   * const right = ['a', 'b'];
   * Iterable.zip(left, right);// [[1, 'a'], [2, 'b']]
   * ```
   * @param left Left iterable
   * @param right Right iterable
   */
  export function zip<L, R>(left: Iterable<L>, right: Iterable<R>): Iterable<[L, R]> {
    return Iterable(() => {
      const leftIterator = iterator(left);
      const rightIterator = iterator(right);

      return {
        next() {
          const leftResult = leftIterator.next();
          const rightResult = rightIterator.next();

          return leftResult.done === true || rightResult.done === true
            ? resultDone
            : resultValue([leftResult.value, rightResult.value]);
        },
      };
    });
  }
}
