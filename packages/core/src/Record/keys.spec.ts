import { describe, expect, it } from 'vitest';
import { keys } from './keys.js';

describe(keys, () => {
  const anySymbolKey = Symbol('anySymbolKey');

  it('should return an array of keys', () => {
    expect(
      Array.from(
        keys({
          anyKey: 'anyValue',
          anyOtherKey: 'anyOtherValue',
        }),
      ),
    ).toEqual(['anyKey', 'anyOtherKey']);
  });
  it('should handle symbol keys', () => {
    expect(
      Array.from(
        keys({
          [anySymbolKey]: 'anyValue',
          anyOtherKey: 'anyOtherValue',
        }),
      ),
    ).toEqual(['anyOtherKey', anySymbolKey]);
  });
});
