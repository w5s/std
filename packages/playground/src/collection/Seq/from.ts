import type { Seq } from '../Seq.js';
import { useSeqState } from './useSeqState.js';
import { iterable as iterableSymbol } from './iterable.js';

/**
 * Return a new sequence from `iterable`
 *
 * @example
 * ```ts
 * Seq.from([1, 2, 3]); // A sequence of 1, 2, 3
 * Seq.from(Iterable.of(1, 2, 3)); // A sequence of 1, 2, 3
 * ```
 * @param iterable
 */
export function from<T>(iterable: Iterable<T>): Seq<T> {
  return {
    [iterableSymbol]: iterable,
    *[Symbol.iterator]() {
      const seqState = useSeqState(this[iterableSymbol]);
      const { resolvedValues, currentIterator } = seqState;
      yield* resolvedValues;

      if (currentIterator !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while (true) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { value, done } = currentIterator.next();
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (done) {
            seqState.currentIterator = undefined;
            break;
          }
          resolvedValues.push(value);
          yield value;
        }
      }
    },
  };
}
