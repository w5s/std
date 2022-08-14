/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, test, expect, jest } from '@jest/globals';
import { assertType } from './type.js';
import { invariant, warning, assertNever } from './invariant.js';

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
describe(warning, () => {
  test('should not call warning.print when condition is true', () => {
    const printSpy = jest.spyOn(warning, 'print');
    warning(true, 'message');
    expect(printSpy).not.toHaveBeenCalled();
  });
  test('should call warning.print when condition is false', () => {
    const printSpy = jest.spyOn(warning, 'print');
    warning(false, 'message');
    expect(printSpy).toHaveBeenCalledWith('Warning: message');
  });
  test('should call warning.print with an empty string when message is not defined', () => {
    const printSpy = jest.spyOn(warning, 'print');
    warning(false, undefined);
    expect(printSpy).toHaveBeenCalledWith('Warning: ');
  });
});
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

  /**
   * Type check
   */
  const typeTestExhaustive = (fruit: 'banana' | 'kiwi'): string => {
    switch (fruit) {
      case 'banana':
        return '🍌 Banana';
      case 'kiwi':
        return '🥝 Kiwi';
      default:
        return assertNever(fruit);
    }
  };
  const typeTestNonExhaustive = (fruit: 'banana' | 'kiwi'): string => {
    switch (fruit) {
      case 'banana':
        return '🍌 Banana';
      default:
        // @ts-expect-error anyValue is not never
        return assertNever(fruit);
    }
  };
});
