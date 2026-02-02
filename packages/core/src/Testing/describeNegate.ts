import type { EqualsInterface } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link Numeric.Negate} interface
 *
 * @example
 * ```typescript
 * describeNegate(Number, {
 *   values: () => [
 *     // [base, negative]
 *     [0, 0],
 *     [1, -1],
 *     // ...
 *   ],
 * });
 *
 * ```
 * @param subject - The subject to test
 * @param properties - Object containing test properties
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeNegate<T>(
  subject: Numeric.Negate<T> & EqualsInterface<T>,
  properties: {
    values: () => Array<[base: T, negated: T]>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const values = properties.values();
  const describeIfValue = values.length === 0 ? describe.todo : describe;
  describeIfValue('negate', () => {
    it.each(values)('satisfies negate($0) == $1', (base, negated) => {
      expect(subject.equals(subject.negate(base), negated)).toBe(true);
    });
    it.each(values)('satisfies negate(negate($0)) == $0', (base) => {
      expect(subject.equals(subject.negate(subject.negate(base)), base)).toBe(true);
    });
    it.each(values)('satisfies negate(negate($1)) == $1', (_, negated) => {
      expect(subject.equals(subject.negate(subject.negate(negated)), negated)).toBe(true);
    });
  });
}
