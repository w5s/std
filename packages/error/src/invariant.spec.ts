import { describe, it, expect } from 'vitest';
import { invariant } from './invariant.js';

describe('invariant', () => {
  const getThrownError = (fn: () => void) => {
    try {
      fn();
    } catch (error: unknown) {
      return error;
    }
    throw new Error('no exception thrown');
  };
  const assertBooleanType = (_value: boolean) => {};

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
      expect.objectContaining({ message: 'my message' }),
    );
  });
  it('should refine typing', () => {
    const value: unknown = true;
    const isBoolean = (anyValue: unknown): anyValue is boolean => typeof anyValue === 'boolean';
    invariant(isBoolean(value));
    assertBooleanType(value);
  });
});
