import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Numeric.Multiply} trait
 *
 * @example
 * ```typescript
 * describeMultiply({ describe, it, expect })(Number, [
 *   { call: [2, 3], returns: 6 },
 *   // ...
 * ]);
 *
 * ```
 * @param testingLibrary
 */
export function describeMultiply(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <L, R, Ret>(subject: Numeric.Multiply<L, R, Ret>, cases: Array<{ call: [L, R]; returns: Ret }>) => {
    (cases.length === 0 ? describe.todo : describe)('*', () => {
      it.each(cases)("satisfies ['*']($call.0, $call.1) == $returns", ({ call, returns }) => {
        const returnValue = subject['*'](...call);
        expect(returnValue).toEqual(returns);
      });
    });
  };
}
