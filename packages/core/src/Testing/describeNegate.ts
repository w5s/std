import type { Equal } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link Numeric.Negate} interface
 *
 * @example
 * ```typescript
 * describeNegate({ describe, it, expect })(Number, {
 *   values: () => [
 *     // [base, negative]
 *     [0, 0],
 *     [1, -1],
 *     // ...
 *   ],
 * });
 *
 * ```
 * @param testingLibrary
 */
export function describeNegate(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Numeric.Negate<T> & Equal<T>,
    properties: {
      values: () => Array<[base: T, negated: T]>;
    },
  ) => {
    const values = properties.values();
    const describeIfValue = values.length === 0 ? describe.todo : describe;
    describeIfValue('negate', () => {
      it.each(values)('satisfies negate($0) == $1', ([base, negated]) => {
        expect(subject['=='](subject.negate(base), negated)).toBe(true);
      });
      it.each(values)('satisfies negate(negate($0)) == $0', ([base]) => {
        expect(subject['=='](subject.negate(subject.negate(base)), base)).toBe(true);
      });
      it.each(values)('satisfies negate(negate($1)) == $1', ([_, negated]) => {
        expect(subject['=='](subject.negate(subject.negate(negated)), negated)).toBe(true);
      });
    });
  };
}
