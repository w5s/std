import { describe, it, expect } from 'vitest';
import { assertType } from './type.js';
import { assign, extend, identity, constant, ignore } from './prelude.js';

describe('identity', () => {
  it.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(identity(value)).toBe(value);
  });
});
describe('ignore', () => {
  it.each([1, undefined, {}])('should return undefined', (value) => {
    expect(ignore(value)).toBe(undefined);
  });
});
describe('constant', () => {
  it.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(constant(value)('abc')).toBe(value);
  });
});
describe('assign', () => {
  it('should return identity when null or undefined or empty object is passed', () => {
    const anyObject = { foo: true };
    expect(assign(anyObject, undefined)).toBe(anyObject);
    expect(assign(anyObject, null)).toBe(anyObject);
    expect(assign(anyObject, {})).toBe(anyObject);
  });
  it('should return a new object when another object is passed', () => {
    expect(assign({ unchanged: '', foo: true }, { foo: false })).toEqual({ unchanged: '', foo: false });
  });
  it('should return identity when values are shallow equals', () => {
    const object = { unchanged: '', foo: true };
    expect(assign(object, { foo: true })).toBe(object);
  });
  it('should not allow adding property', () => {
    const object = { unchanged: '', foo: true };
    // @ts-expect-error notAllowed is not present in object
    assign(object, { notAllowed: false });
  });
});
describe('extend', () => {
  it('should return identity when null or undefined is passed', () => {
    const anyObject = { foo: true };
    expect(extend(anyObject, undefined)).toBe(anyObject);
    expect(extend(anyObject, null)).toBe(anyObject);
    expect(extend(anyObject, {})).toBe(anyObject);
  });
  it('should return identity when values are shallow equals', () => {
    const object = { unchanged: '', foo: true };
    expect(assign(object, { foo: true })).toBe(object);
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
