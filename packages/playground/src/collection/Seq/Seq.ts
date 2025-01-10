import type { Seq as SeqInterface } from '../Seq.js';
import { useSeqState } from './useSeqState.js';
import { iterable as iterableSymbol } from './iterable.js';

/**
 * @internal
 */
export class Seq<T> implements SeqInterface<T> {
  [iterableSymbol]: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this[iterableSymbol] = iterable;
  }

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
  }
}
