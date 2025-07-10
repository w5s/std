import type { Seq as SeqInterface } from '../Seq.js';
import { __useSeqState } from './__useSeqState.js';
import { seqIterable } from './seqIterable.js';

/**
 * @internal
 */
export class Seq<T> implements SeqInterface<T> {
  [seqIterable]: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this[seqIterable] = iterable;
  }

  *[Symbol.iterator]() {
    const seqState = __useSeqState(this[seqIterable]);
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
