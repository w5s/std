import type { Numeric } from '../Numeric.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Numeric.Add} trait
 *
 * @example
 * ```typescript
 * describeAdd(Number, [
 *   { call: [1, 1], returns: 2 },
 *   // ...
 * ]);
 *
 * ```
 * @param subject - The subject to test
 * @param cases - Array of objects containing test cases
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeAdd<L, R, Ret>(
  subject: Numeric.Add<L, R, Ret>,
  cases: Array<{ call: [L, R]; returns: Ret }>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const op = '+';
  (cases.length === 0 ? describe.todo : describe)(op, () => {
    it.each(cases)(`satisfies ['${op}']($call.0, $call.1) == $returns`, ({ call, returns }) => {
      expect(subject[op](...call)).toEqual(returns);
    });
  });
}
