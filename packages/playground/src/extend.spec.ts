import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import { extend } from './extend.js';

describe('extend', () => {
  it('should return identity when null or undefined is passed', () => {
    const anyObject = { foo: true };
    expect(extend(anyObject, undefined)).toBe(anyObject);
    expect(extend(anyObject, null)).toBe(anyObject);
    expect(extend(anyObject, {})).toBe(anyObject);
  });
  it('should return identity when values are shallow equals', () => {
    const object = { foo: true, unchanged: '' };
    expect(extend(object, { foo: true })).toBe(object);
  });
  it('should return a new object when another object is passed', () => {
    const result = extend({ override: true, unchanged: '' }, { newProperty: false, override: 'false' });
    expect(result).toEqual({
      newProperty: false,
      override: 'false',
      unchanged: '',
    });
    assertType<typeof result, { newProperty: boolean; override: string; unchanged: string }>(true);
  });
});
