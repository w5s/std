import { describe, expect, it } from '@jest/globals';
import { Disposable, AsyncDisposable } from './disposable.js';
import { Symbol } from './symbol.js';

describe('Disposable', () => {
  describe('.hasInstance()', () => {
    it.each([
      [{ [Symbol.dispose]: () => {} }, true],
      [{ [Symbol.dispose]: 'not_a_function' }, false],
      [{ [Symbol.asyncDispose]: () => {} }, false],
      [{ [Symbol.dispose]: true }, false],
      [{}, false],
      ['string', false],
      [null, false],
      [undefined, false],
    ])('should return true for { [Symbol.dispose] }', (object, expected) => {
      expect(Disposable.hasInstance(object)).toEqual(expected);
    });
  });
});
describe('AsyncDisposable', () => {
  describe('.hasInstance()', () => {
    it.each([
      [{ [Symbol.dispose]: () => {} }, false],
      [{ [Symbol.asyncDispose]: () => {} }, true],
      [{ [Symbol.asyncDispose]: 'not_a_function' }, false],
      [{ [Symbol.dispose]: true }, false],
      [{}, false],
      ['string', false],
      [null, false],
      [undefined, false],
    ])('should return true for { [Symbol.asyncDispose] }', (object, expected) => {
      expect(AsyncDisposable.hasInstance(object)).toEqual(expected);
    });
  });
});
