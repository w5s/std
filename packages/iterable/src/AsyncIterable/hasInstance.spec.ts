import { describe, expect, it } from 'vitest';

import { hasInstance } from './hasInstance.js';

describe(hasInstance, () => {
  it.each([
    [{ [Symbol.iterator]: () => {} }, false],
    [{ [Symbol.iterator]: 'not_a_function' }, false],
    // eslint-disable-next-line unicorn/no-invalid-well-known-symbol-methods
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
