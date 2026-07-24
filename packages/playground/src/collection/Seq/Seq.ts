import type { Seq as SeqInterface } from '../Seq.js';

import { useSeqState } from '../internal/useSeqState.js';
import { seqIterable } from './seqIterable.js';

/**
 * @internal
 */
export class Seq<T> implements SeqInterface<T> {
  [seqIterable]: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this[seqIterable] = iterable;
  }

  * [Symbol.iterator]() {
    const seqState = useSeqState(this[seqIterable]);
    const { currentIterator, resolvedValues } = seqState;
    yield* resolvedValues;

    if (currentIterator !== undefined) {
      while (true) {
        const { done, value } = currentIterator.next();

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
