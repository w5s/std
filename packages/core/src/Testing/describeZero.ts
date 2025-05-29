import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link Zero} interface
 *
 * @example
 * ```typescript
 * describeZero({ describe, it, expect })(Number, {
 *   notZero: () => [1, -1, 1.5],
 * });
 * ```
 * @param testingLibrary
 */
export function describeZero(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Numeric.Zero<T>,
    properties: {
      /**
       * Generates a list of non zero values
       */
      nonZero: () => Array<T>;
    },
  ) => {
    describe('isZero', () => {
      it('satisfies isZero(zero()) == true', () => {
        expect(subject.isZero(subject.zero())).toBe(true);
      });
      it.each(properties.nonZero())('satisfies isZero($0) == false', (value) => {
        expect(subject.isZero(value)).toBe(false);
      });
    });
  };
}
