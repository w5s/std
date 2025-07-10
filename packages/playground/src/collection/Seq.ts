import { Callable } from '@w5s/core/dist/Callable.js';
import { from } from './Seq/from.js';
import { of } from './Seq/of.js';
import { hasInstance } from './Seq/hasInstance.js';
import type { seqIterable } from './Seq/seqIterable.js';

export interface Seq<T> extends Iterable<T> {
  readonly [seqIterable]: Iterable<T>;
}

/**
 * @namespace
 */
export const Seq = Callable({
  [Callable.symbol]: from,
  from,
  of,
  hasInstance,
});
