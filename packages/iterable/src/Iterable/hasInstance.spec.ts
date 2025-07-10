import { describe, it, expect } from 'vitest';
import { hasInstance } from './hasInstance.js';

describe(hasInstance, () => {
  it.each([
    [{ [Symbol.iterator]: () => {} }, true],
    [{ [Symbol.iterator]: 'not_a_function' }, false],
    [[], true],
    [{}, false],
    ['string', false],
    [null, false],
    [undefined, false],
  ])('should return true for { [Symbol.iterator] }', (object, expected) => {
    expect(hasInstance(object)).toEqual(expected);
  });
});
