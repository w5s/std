/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi } from 'vitest';
import { assertType } from './type.js';
import { invariant, warning, assertNever } from './invariant.js';

describe('invariant', () => {
  const getThrownError = (fn: () => void) => {
    try {
      fn();
    } catch (error: unknown) {
      return error;
    }
    throw new Error('no exception thrown');
  };

  it('should return undefined if true as first parameter', () => {
    expect(invariant(true)).toBe(undefined);
  });
  it('should throw error if false as first parameter', () => {
    // eslint-disable-next-line unicorn/error-message
    expect(() => invariant(false)).toThrow(new Error(''));
  });
  it('should throw error an error with InvariantError as name', () => {
    expect(getThrownError(() => invariant(false))).toEqual(expect.objectContaining({ name: 'InvariantError' }));
  });
  it('should throw error an error with a correct message', () => {
    expect(getThrownError(() => invariant(false, 'my message'))).toEqual(
      expect.objectContaining({ message: 'my message' })
    );
  });
  it('should refine typing', () => {
    const value: unknown = true;
    const isBoolean = (anyValue: unknown): anyValue is boolean => typeof anyValue === 'boolean';
    invariant(isBoolean(value));

    assertType<typeof value, boolean>(true);
  });
});
describe('warning', () => {
  it('should not call warning.print when condition is true', () => {
    const printSpy = vi.spyOn(warning, 'current').mockImplementationOnce(() => {
      // do nothing
    });
    warning(true, 'message');
    expect(printSpy).not.toHaveBeenCalled();
  });
  it('should call warning.print when condition is false', () => {
    const printSpy = vi.spyOn(warning, 'current').mockImplementationOnce(() => {
      // do nothing
    });
    warning(false, 'message');
    expect(printSpy).toHaveBeenCalledWith('Warning: message');
  });
  it('should call warning.print with an empty string when message is not defined', () => {
    const printSpy = vi.spyOn(warning, 'current').mockImplementationOnce(() => {
      // do nothing
    });
    warning(false, undefined);
    expect(printSpy).toHaveBeenCalledWith('Warning: ');
  });
});
describe('assertNever', () => {
  const anyValue = undefined;
  const neverValue: never = undefined as never;

  it('should report ts error', () => {
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
      case 'banana': {
        return '🍌 Banana';
      }
      case 'kiwi': {
        return '🥝 Kiwi';
      }
      default: {
        return assertNever(fruit);
      }
    }
  };
  const typeTestNonExhaustive = (fruit: 'banana' | 'kiwi'): string => {
    switch (fruit) {
      case 'banana': {
        return '🍌 Banana';
      }
      default: {
        // @ts-expect-error anyValue is not never
        return assertNever(fruit);
      }
    }
  };
});
