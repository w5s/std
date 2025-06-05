import type { Numeric } from '../Numeric.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Numeric.Divide} trait
 *
 * @example
 * ```typescript
 * describeDivide({ describe, it, expect })(Number, [
 *   { call: [2, 3], returns: 6 },
 *   // ...
 * ]);
 *
 * ```
 * @param subject - The subject to test
 * @param cases - Array of objects containing test cases
 * @param testingLibrary - Optional testing library to use. Defaults to the default
 */
export function describeDivide<L, R, Ret>(
  subject: Numeric.Divide<L, R, Ret>,
  cases: Array<{ call: [L, R]; returns: Ret }>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  (cases.length === 0 ? describe.todo : describe)('*', () => {
    it.each(cases)("satisfies ['/']($call.0, $call.1) == $returns", ({ call, returns }) => {
      const returnValue = subject['/'](...call);
      expect(returnValue).toEqual(returns);
    });
  });
}
