import { describe, expect, it } from 'vitest';

import { assign } from './assign.js';

describe('assign', () => {
  it('should return identity when null or undefined or empty object is passed', () => {
    const anyObject = { foo: true };
    expect(assign(anyObject, undefined)).toBe(anyObject);
    expect(assign(anyObject, null)).toBe(anyObject);
    expect(assign(anyObject, {})).toBe(anyObject);
  });
  it('should return a new object when another object is passed', () => {
    expect(assign({ foo: true, unchanged: '' }, { foo: false })).toEqual({ foo: false, unchanged: '' });
  });
  it('should return identity when values are shallow equals', () => {
    const object = { foo: true, unchanged: '' };
    expect(assign(object, { foo: true })).toBe(object);
  });
  // eslint-disable-next-line test/expect-expect
  it('should not allow adding property', () => {
    const object = { foo: true, unchanged: '' };
    // @ts-expect-error notAllowed is not present in object
    assign(object, { notAllowed: false });
  });
});
