import type { Numeric } from '../Numeric.js';
import { Option } from '../Option.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Numeric.CheckedAdd} trait
 *
 * @example
 * ```typescript
 * describeCheckedAdd({ describe, it, expect })(Number, [
 *   { call: [1, 1], returns: 2 },
 *   // ...
 * ]);
 *
 * ```
 * @param testingLibrary
 */
export function describeCheckedAdd(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <L, R, Ret>(subject: Numeric.CheckedAdd<L, R, Ret>, cases: Array<{ call: [L, R]; returns: Option<Ret> }>) => {
    (cases.length === 0 ? describe.todo : describe)('+?', () => {
      it.each(cases)("satisfies ['+?']($call.0, $call.1) == $returns", ({ call, returns }) => {
        const returnValue = subject['+?'](...call);
        expect(returnValue).toEqual(returns);
      });
    });
  };
}
