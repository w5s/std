import type { Not } from '../Not.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core!Not} interface
 *
 * @example
 * ```typescript
 * describeNot({ describe, it, expect })(Number, {
 *   opposites: [
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
      opposites: () => Array<[T, T]>;
    },
  ) => {
    (properties.opposites.length === 0 ? describe.todo : describe)('not', () => {
      it.each(properties.opposites())('satisfies not($0) == $1', ([left, right]) => {
        expect(subject.not(left)).toEqual(right);
      });
    });
    (properties.opposites.length === 0 ? describe.todo : describe)('not', () => {
      it.each(properties.opposites())('satisfies $0 == not($1)', ([left, right]) => {
        expect(subject.not(right)).toEqual(left);
      });
    });
    (properties.opposites.length === 0 ? describe.todo : describe)('not', () => {
      it.each(properties.opposites())('satisfies not(not($0)) == $0', ([left]) => {
        expect(subject.not(subject.not(left))).toEqual(left);
      });
    });
  };
}
