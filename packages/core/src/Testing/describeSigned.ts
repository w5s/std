import type { EqualsInterface } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

import { defaultTestingLibrary } from './defaultTestingLibrary.js';

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
 * @param subject The subject to test
 * @param properties Object containing test properties
 * @param properties.values
 * @param testingLibrary Optional testing library to use. Automatically detects if not provided.
 */
export function describeSigned<T>(
  subject: EqualsInterface<T> & Numeric.Signed<T>,
  properties: {
    values: () => Array<{
      /**
       * Expected abs value
       */
      abs: T;

      /**
       * Expected sign value
       */
      sign: T;

      /**
       * Expected type for isNegative / isPositive
       */
      type: 'negative' | 'positive' | 'zero';

      value: T;
    }>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, expect, it } = testingLibrary;
  const describeIfValue = properties.values().length === 0 ? describe.todo : describe;

  describeIfValue('abs', () => {
    it.each(properties.values())('satisfies abs($value) == $abs', ({ abs, value }) => {
      expect(subject.equals(subject.abs(value), abs)).toBe(true);
    });
  });
  describeIfValue('sign', () => {
    it.each(properties.values())('satisfies sign($value) == $sign', ({ sign, value }) => {
      expect(subject.equals(subject.sign(value), sign)).toBe(true);
    });
  });
  describeIfValue('isPositive', () => {
    it.each(properties.values().map(({ type, value }) => ({ expected: type === 'positive', value })))(
      'satisfies isPositive($value) == $expected',
      ({ expected, value }) => {
        expect(subject.isPositive(value)).toBe(expected);
      },
    );
  });
  describeIfValue('isNegative', () => {
    it.each(properties.values().map(({ type, value }) => ({ expected: type === 'negative', value })))(
      'satisfies isNegative($value) == $expected',
      ({ expected, value }) => {
        expect(subject.isNegative(value)).toBe(expected);
      },
    );
  });
}
