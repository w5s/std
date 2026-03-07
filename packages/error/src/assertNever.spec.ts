/* eslint-disable ts/no-unused-vars */
import { describe, it } from 'vitest';
import { assertNever } from './assertNever.js';

describe('assertNever', () => {
  const anyValue = undefined;
  const neverValue: never = undefined as never;

  it('should report ts error', () => {
    if (false) {
      // @ts-expect-error anyValue is not never
      assertNever(anyValue);
    }
  });

  /**
   * Type check
   *
   * @param fruit
   * @example
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
