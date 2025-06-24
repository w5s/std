import type { Not } from '../Not.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core!Not} interface
 *
 * @example
 * ```typescript
 * describeNot(Number, {
 *   values: () => [
 *     // [value, negation]
 *     [-1, 1],
 *     [0, 0],
 *     [1.5, -1.5],
 *   ],
 * });
 * ```
 * @param subject - the subject to test
 * @param cases - Generates a list of [value, negation] values to test against
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeNot<T>(
  subject: Not<T>,
  cases: () => Array<[value: T, negation: T]>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  (cases().length === 0 ? describe.todo : describe)('not', () => {
    it.each(cases())('satisfies not($0) == $1', (left, right) => {
      expect(subject.not(left)).toEqual(right);
    });
    it.each(cases())('satisfies $0 == not($1)', (left, right) => {
      expect(subject.not(right)).toEqual(left);
    });
    it.each(cases())('satisfies not(not($0)) == $0', (left) => {
      expect(subject.not(subject.not(left))).toEqual(left);
    });
  });
}
