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
  it('is idempotent', () => {
    const result = keys({
      anyKey: 'anyValue',
      anyOtherKey: 'anyOtherValue',
    });
    expect(Array.from(result)).toEqual(Array.from(result));
  });
});
