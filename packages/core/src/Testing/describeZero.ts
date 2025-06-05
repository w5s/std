import type { Numeric } from '../Numeric.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link Zero} interface
 *
 * @example
 * ```typescript
 * describeZero(Number, {
 *   notZero: () => [1, -1, 1.5],
 * });
 * ```
 * @param subject - The subject to test
 * @param properties - Object containing test properties
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeZero<T>(
  subject: Numeric.Zero<T>,
  properties: {
    /**
     * Generates a list of non zero values
     */
    nonZero: () => Array<T>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;

  describe('isZero', () => {
    it('satisfies isZero(zero()) == true', () => {
      expect(subject.isZero(subject.zero())).toBe(true);
    });
    it.each(properties.nonZero())('satisfies isZero($0) == false', (value) => {
      expect(subject.isZero(value)).toBe(false);
    });
  });
}
