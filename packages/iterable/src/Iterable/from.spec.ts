import { describe, it, expect } from 'vitest';
import { from } from './from.js';
import { withIterable } from '../Testing.js';
import { Iterable } from '../Iterable.js';

describe(from, () => {
  const expectIterable = withIterable(expect);

  it('returns values for an array of promise or values', () => {
    const result = from([1, 2, 3]);
    expectIterable(result).toHaveValues([1, 2, 3]);
  });
  it('returns values for an iterable of promise or values', () => {
    const result = from(Iterable.of(1, 2, 3));
    expectIterable(result).toHaveValues([1, 2, 3]);
  });
  it('returns values from a generator function', () => {
    const result = from(function* gen() {
      yield 1;
      yield 2;
      yield 3;
    });
    expectIterable(result).toHaveValues([1, 2, 3]);
  });
  it('returns values for a function that returns an iterator', () => {
    const anyArray = [1, 2, 3];
    const result = from(anyArray.values.bind(anyArray));
    expectIterable(result).toHaveValues([1, 2, 3]);
  });
});
