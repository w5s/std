import { describe, expect, it } from 'vitest';
import { from } from './from.js';

describe(from, () => {
  it('should return a dictionary from entries', () => {
    expect(
      from([
        ['anyKey', 'anyValue'],
        ['anyOtherKey', 'anyOtherValue'],
      ]),
    ).toEqual({
      anyKey: 'anyValue',
      anyOtherKey: 'anyOtherValue',
    });
  });
});
