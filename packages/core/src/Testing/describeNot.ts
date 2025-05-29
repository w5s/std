import type { Not } from '../Not.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core!Not} interface
 *
 * @example
 * ```typescript
 * describeNot({ describe, it, expect })(Number, {
 *   values: () => [
 *     // [value, negation]
 *     [-1, 1],
 *     [0, 0],
 *     [1.5, -1.5],
 *   ],
 * });
 * ```
 * @param testingLibrary
 */
export function describeNot(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Not<T>,
    properties: {
      /**
       * Generates a list of [value, negation] values to test against
       *
       * @returns
       */
      values: () => Array<[value: T, negation: T]>;
    },
  ) => {
    (properties.values.length === 0 ? describe.todo : describe)('not', () => {
      it.each(properties.values())('satisfies not($0) == $1', (left, right) => {
        expect(subject.not(left)).toEqual(right);
      });
      it.each(properties.values())('satisfies $0 == not($1)', (left, right) => {
        expect(subject.not(right)).toEqual(left);
      });
      it.each(properties.values())('satisfies not(not($0)) == $0', (left) => {
        expect(subject.not(subject.not(left))).toEqual(left);
      });
    });
  };
}
