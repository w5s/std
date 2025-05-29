import type { Equal } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Numeric.Signed behavior
 *
 * @example
 * ```typescript
 * describeSigned({ describe, it, expect })(Number, {
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
 * @param testingLibrary
 */
export function describeSigned(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
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
  ) => {
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
  };
}
