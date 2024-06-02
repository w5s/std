import { describe, expect, it } from 'vitest';
import { entries } from './entries.js';

describe(entries, () => {
  it('should return an array of [key, value]', () => {
    expect(
      Array.from(
        entries({
          anyKey: 'anyValue',
          anyOtherKey: 'anyOtherValue',
        })
      )
    ).toEqual([
      ['anyKey', 'anyValue'],
      ['anyOtherKey', 'anyOtherValue'],
    ]);
  });
});
