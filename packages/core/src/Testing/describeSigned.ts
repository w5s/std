import type { Equal } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Numeric.Signed behavior
 *
 * @example
 * ```typescript
 * describeSigned(Number, {
 *   values: () => [
 *     { value: -2, type: 'negative', sign: -1, abs: 2 },
 *     { value: -1, type: 'negative', sign: -1, abs: 1 },
 *     { value: 0, type: 'zero', sign: 0, abs: 0 },
 *     { value: 1, type: 'positive', sign: 1, abs: 1 },
 *     { value: 2, type: 'positive', sign: 1, abs: 2 },
 *     // ...
 *   ],
 * });
 *
 * ```
 * @param subject - The subject to test
 * @param properties - Object containing test properties
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeSigned<T>(
  subject: Numeric.Signed<T> & Equal<T>,
  properties: {
    values: () => Array<{
      value: T;
      /**
       * Expected type for isNegative / isPositive
       */
      type: 'negative' | 'zero' | 'positive';
      /**
       * Expected sign value
       */
      sign: T;
      /**
       * Expected abs value
       */
      abs: T;
    }>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const describeIfValue = properties.values().length === 0 ? describe.todo : describe;

  describeIfValue('abs', () => {
    it.each(properties.values())('satisfies abs($value) == $abs', ({ abs, value }) => {
      expect(subject['=='](subject.abs(value), abs)).toBe(true);
    });
  });
  describeIfValue('sign', () => {
    it.each(properties.values())('satisfies sign($value) == $sign', ({ sign, value }) => {
      expect(subject['=='](subject.sign(value), sign)).toBe(true);
    });
  });
  describeIfValue('isPositive', () => {
    it.each(properties.values().map(({ type, value }) => ({ value, expected: type === 'positive' })))(
      'satisfies isPositive($value) == $expected',
      ({ expected, value }) => {
        expect(subject.isPositive(value)).toBe(expected);
      },
    );
  });
  describeIfValue('isNegative', () => {
    it.each(properties.values().map(({ type, value }) => ({ value, expected: type === 'negative' })))(
      'satisfies isNegative($value) == $expected',
      ({ expected, value }) => {
        expect(subject.isNegative(value)).toBe(expected);
      },
    );
  });
}
