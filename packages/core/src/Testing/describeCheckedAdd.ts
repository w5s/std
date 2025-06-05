import type { Numeric } from '../Numeric.js';
import { Option } from '../Option.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Numeric.CheckedAdd} trait
 *
 * @example
 * ```typescript
 * describeCheckedAdd(Number, [
 *   { call: [1, 1], returns: 2 },
 *   // ...
 * ]);
 *
 * ```
 * @param subject - The subject to test
 * @param cases - Array of objects containing test cases
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeCheckedAdd<L, R, Ret>(
  subject: Numeric.CheckedAdd<L, R, Ret>,
  cases: Array<{ call: [L, R]; returns: Option<Ret> }>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  (cases.length === 0 ? describe.todo : describe)('+?', () => {
    it.each(cases)("satisfies ['+?']($call.0, $call.1) == $returns", ({ call, returns }) => {
      const returnValue = subject['+?'](...call);
      expect(returnValue).toEqual(returns);
    });
  });
}
