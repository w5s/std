import { describe, expect, it } from 'vitest';
import { values } from './values.js';

describe(values, () => {
  it('should return an array of keys', () => {
    expect(
      Array.from(
        values({
          anyKey: 'anyValue',
          anyOtherKey: 'anyOtherValue',
        }),
      ),
    ).toEqual(['anyValue', 'anyOtherValue']);
  });
});
