import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core/dist/Testing.js';
import { extend } from './extend.js';

describe('extend', () => {
  it('should return identity when null or undefined is passed', () => {
    const anyObject = { foo: true };
    expect(extend(anyObject, undefined)).toBe(anyObject);
    expect(extend(anyObject, null)).toBe(anyObject);
    expect(extend(anyObject, {})).toBe(anyObject);
  });
  it('should return identity when values are shallow equals', () => {
    const object = { unchanged: '', foo: true };
    expect(extend(object, { foo: true })).toBe(object);
  });
  it('should return a new object when another object is passed', () => {
    const result = extend({ unchanged: '', override: true }, { override: 'false', newProperty: false });
    expect(result).toEqual({
      unchanged: '',
      override: 'false',
      newProperty: false,
    });
    assertType<typeof result, { unchanged: string; override: string; newProperty: boolean }>(true);
  });
});
