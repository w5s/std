import { describe, it, expect, jest } from '@jest/globals';
import { shallowEqual } from './shallowEqual.js';

describe('shallowEqual', () => {
  // test cases copied from https://github.com/facebook/fbjs/blob/82247de1c33e6f02a199778203643eaee16ea4dc/src/core/__tests__/shallowEqual-test.js
  it('returns false if either argument is null', () => {
    expect(shallowEqual(null, {})).toEqual(false);
    expect(shallowEqual({}, null)).toEqual(false);
  });

  it('returns true if both arguments are null or undefined', () => {
    expect(shallowEqual(null, null)).toEqual(true);
    expect(shallowEqual(undefined, undefined)).toEqual(true);
  });
  it('returns true if both arguments are NaN', () => {
    expect(shallowEqual(Number.NaN, Number.NaN)).toEqual(true);
  });

  it('returns true if arguments are shallow equal', () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toEqual(true);
  });

  it('returns false if arguments are not objects and not equal', () => {
    expect(shallowEqual(1, 2)).toEqual(false);
  });

  it('returns false if only one argument is not an object', () => {
    expect(shallowEqual(1, {} as unknown)).toEqual(false);
  });

  it('returns false if first argument has too many keys', () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual(false);
  });

  it('returns false if second argument has too many keys', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toEqual(false);
  });

  it('returns true if values are not primitives but are ===', () => {
    const obj = {};
    expect(shallowEqual({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj })).toEqual(true);
  });

  // subsequent test cases are copied from lodash tests
  it('returns false if arguments are not shallow equal', () => {
    expect(shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} })).toEqual(false);
  });

  it('should provide the correct `equalValueFn` arguments', () => {
    type TestObject = {
      a: number[];
      b: typeof objectCommon;
    };

    const objectCommon = { common: true };
    const object1: TestObject = { a: [1, 2], b: objectCommon };
    const object2: TestObject = { a: [3, 4], b: objectCommon };

    const spy = jest.fn(() => true);
    shallowEqual(object1, object2, spy);

    expect(spy.mock.calls).toEqual([
      [object1.a, object2.a, 'a'],
      [object1.b, object2.b, 'b'],
    ]);
  });

  it('should not handle comparisons if `equalFn` returns `true`', () => {
    const equalFn = (value: string | number) => typeof value === 'string';

    // expect(shallowEqual(['a'], ['b'], equalFn)).toEqual(true);
    expect(shallowEqual({ '0': 'a' }, { '0': 'b' }, equalFn)).toEqual(true);
  });

  it('should not handle comparisons if `equalFn` returns `false`', () => {
    expect(shallowEqual(['a'], ['a'], (left, _right, _key) => typeof left !== 'string')).toEqual(false);
    expect(shallowEqual({ '0': 'a' }, { '0': 'a' }, (left, _right, _key) => typeof left !== 'string')).toEqual(false);
  });

  it('should treat objects created by `Object.create(null)` like any other plain object', () => {
    const object1 = Object.assign(Object.create(null), { a: 1 });
    const object2 = { a: 1 };
    expect(shallowEqual(object1, object2)).toEqual(true);
  });
});
