import { describe, it, expect } from 'vitest';
import { hasInstance } from './hasInstance.js';

describe(hasInstance, () => {
  it.each([
    [{ [Symbol.iterator]: () => {} }, false],
    [{ [Symbol.iterator]: 'not_a_function' }, false],
    [{ [Symbol.asyncIterator]: async () => {} }, true],
    [{ [Symbol.asyncIterator]: 'not_a_function' }, false],
    [[], false],
    [{}, false],
    ['string', false],
    [null, false],
    [undefined, false],
  ])('(%s) => %s', (object, expected) => {
    expect(hasInstance(object)).toEqual(expected);
  });
});
