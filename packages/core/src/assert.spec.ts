/* eslint-disable @typescript-eslint/no-unused-vars */
import { assertNever, assertType, invariant } from './assert.js';

describe(assertNever, () => {
  const anyValue = undefined;
  const neverValue: never = undefined as never;

  test('should report ts error', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    () => {
      // @ts-expect-error anyValue is not never
      assertNever(anyValue);
    };
  });
  test('should throw error', () => {
    expect(() => {
      assertNever(neverValue);
    }).toThrow(TypeError);
  });
  test('should not throw error if second parameter', () => {
    const returnValue = {};
    expect(() => {
      assertNever(neverValue, returnValue);
    }).not.toThrow();
    expect(assertNever(neverValue, returnValue)).toBe(returnValue);
  });

  /**
   * Type check
   */
  const typeTestThrow = (fruit: 'banana' | 'kiwi'): string => {
    switch (fruit) {
      case 'banana':
        return '🍌 Banana';
      case 'kiwi':
        return '🥝 Kiwi';
      default:
        return assertNever(fruit);
    }
  };

  const typeTestNoThrow = (fruit: 'banana' | 'kiwi'): string | { test: true } => {
    switch (fruit) {
      case 'banana':
        return '🍌 Banana';
      case 'kiwi':
        return '🥝 Kiwi';
      default:
        return assertNever(fruit, { test: true });
    }
  };
});

describe(invariant, () => {
  const getThrownError = (fn: () => void) => {
    try {
      fn();
    } catch (error: unknown) {
      return error;
    }
    throw new Error('no exception thrown');
  };

  test('should return undefined if true as first parameter', () => {
    expect(invariant(true)).toBe(undefined);
  });
  test('should throw error if false as first parameter', () => {
    // eslint-disable-next-line unicorn/error-message
    expect(() => invariant(false)).toThrow(new Error(''));
  });
  test('should throw error an error with InvariantError as name', () => {
    expect(getThrownError(() => invariant(false))).toEqual(expect.objectContaining({ name: 'InvariantError' }));
  });
  test('should throw error an error with a correct message', () => {
    expect(getThrownError(() => invariant(false, 'my message'))).toEqual(
      expect.objectContaining({ message: 'my message' })
    );
  });
  test('should refine typing', () => {
    const value: unknown = true;
    const isBoolean = (anyValue: unknown): anyValue is boolean => typeof anyValue === 'boolean';
    invariant(isBoolean(value));

    assertType<typeof value, boolean>(true);
  });
});
