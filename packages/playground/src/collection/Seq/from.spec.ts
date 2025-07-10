import { describe, it, expect } from 'vitest';
import { withIterable } from '@w5s/iterable/dist/Testing.js';
import { from } from './from.js';

describe(from, () => {
  const expectIterable = withIterable(expect);

  it('creates a sequence from an array', () => {
    const seq = from([1, 2, 3]);
    expectIterable(seq).toHaveValues([1, 2, 3]);
  });

  it('creates a sequence from a Set', () => {
    const seq = from(new Set([1, 2, 3]));
    expectIterable(seq).toHaveValues([1, 2, 3]);
  });

  it('creates a sequence from a Map', () => {
    const seq = from(
      new Map([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]),
    );
    expectIterable(seq).toHaveValues([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('creates a sequence from a string', () => {
    const seq = from('abc');
    expectIterable(seq).toHaveValues(['a', 'b', 'c']);
  });

  it('handles an empty iterable', () => {
    const seq = from([]);
    expectIterable(seq).toHaveValues([]);
  });

  it('handles an iterable with a single element', () => {
    const seq = from([42]);
    expectIterable(seq).toHaveValues([42]);
  });

  it('handles an iterable with mixed types', () => {
    const seq = from([1, 'a', true, null]);
    expectIterable(seq).toHaveValues([1, 'a', true, null]);
  });

  it('caches values between iterations', () => {
    let i = 0;
    const iterable = {
      *[Symbol.iterator]() {
        // eslint-disable-next-line no-plusplus
        yield i++;
        // eslint-disable-next-line no-plusplus
        yield i++;
        // eslint-disable-next-line no-plusplus
        yield i++;
      },
    };
    const seq = from(iterable);
    expectIterable(seq).toHaveValues([0, 1, 2]);
    expectIterable(seq).toHaveValues([0, 1, 2]);
    expectIterable(from(iterable)).toHaveValues([0, 1, 2]);
  });
});
