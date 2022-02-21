/* eslint-disable id-length */
import { assertType } from './assert.js';
import { assign, extend, identity, constant, pipe, throwError } from './prelude.js';

describe(identity, () => {
  test.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(identity(value)).toBe(value);
  });
});
describe(constant, () => {
  test.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(constant(value)('abc')).toBe(value);
  });
});
describe(throwError, () => {
  test('should return the same unchanged value', () => {
    const error = new Error('TestError');
    expect(() => {
      throwError(error);
    }).toThrow(error);
  });
});
describe(assign, () => {
  test('should return identity when null or undefined or empty object is passed', () => {
    const anyObject = { foo: true };
    expect(assign(anyObject, undefined)).toBe(anyObject);
    expect(assign(anyObject, null)).toBe(anyObject);
    expect(assign(anyObject, {})).toBe(anyObject);
  });
  test('should return a new object when another object is passed', () => {
    expect(assign({ unchanged: '', foo: true }, { foo: false })).toEqual({ unchanged: '', foo: false });
  });
  test('should return identity when values are shallow equals', () => {
    const object = { unchanged: '', foo: true };
    expect(assign(object, { foo: true })).toBe(object);
  });
  test('should not allow adding property', () => {
    const object = { unchanged: '', foo: true };
    // @ts-expect-error notAllowed is not present in object
    assign(object, { notAllowed: false });
  });
});
describe(extend, () => {
  test('should return identity when null or undefined is passed', () => {
    const anyObject = { foo: true };
    expect(extend(anyObject, undefined)).toBe(anyObject);
    expect(extend(anyObject, null)).toBe(anyObject);
    expect(extend(anyObject, {})).toBe(anyObject);
  });
  test('should return identity when values are shallow equals', () => {
    const object = { unchanged: '', foo: true };
    expect(assign(object, { foo: true })).toBe(object);
  });
  test('should return a new object when another object is passed', () => {
    const result = extend({ unchanged: '', override: true }, { override: 'false', newProperty: false });
    expect(result).toEqual({
      unchanged: '',
      override: 'false',
      newProperty: false,
    });
    assertType<typeof result, { unchanged: string; override: string; newProperty: boolean }>(true);
  });
});
describe(pipe, () => {
  const f = (n: number) => n + 1;
  const g = (n: number) => n * 2;
  test('should pipe value to the .to() function', () => {
    expect(pipe(2).to()).toBe(2);
    expect(pipe(2).to(f)).toBe(3);
    expect(pipe(2).to(f, g)).toBe(6);
    expect(pipe(2).to(f, g, f)).toBe(7);
    expect(pipe(2).to(f, g, f, g)).toBe(14);
    expect(pipe(2).to(f, g, f, g, f)).toBe(15);
    expect(pipe(2).to(f, g, f, g, f, g)).toBe(30);
    expect(pipe(2).to(f, g, f, g, f, g, f)).toBe(31);
    expect(pipe(2).to(f, g, f, g, f, g, f, g)).toBe(62);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f)).toBe(63);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g)).toBe(126);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f)).toBe(127);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g)).toBe(254);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(255);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(510);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(511);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(1022);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(1023);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(2046);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(2047);
    // this is just to satisfy noImplicitReturns and 100% coverage
  });
  test('should throw error for arity > 20', () => {
    expect(() => {
      // @ts-expect-error the arity is out of bound
      pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g);
    }).toThrow(new TypeError('Wrong arity'));
  });
});
