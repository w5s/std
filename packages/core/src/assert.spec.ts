/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, test, expect } from '@jest/globals';
import { assertNever } from './assert.js';

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
