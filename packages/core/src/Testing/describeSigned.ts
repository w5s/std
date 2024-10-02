import type { Equal } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Numeric.Signed behavior
 *
 * @example
 * ```ts
 * describeSigned({ describe, it, expect })(Number, {
 *   abs: [
 *     { call: [-1], returns: 1 },
 *     // ...
 *   ],
 *   sign: [
 *     { call: [-6], returns: -1 },
 *     // ...
 *   ],
 * });
 *
 * ```
 * @param testingLibrary
 */
export function describeSigned(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Numeric.Signed<T> & Equal<T>,
    properties: {
      abs: Array<{ call: [T]; returns: T }>;
      sign: Array<{ call: [T]; returns: T }>;
    },
  ) => {
    (properties.abs.length === 0 ? describe.todo : describe)('abs', () => {
      it.each(properties.abs)('satisfies abs($call.0) == $returns', ({ call, returns }) => {
        expect(subject['=='](subject.abs(...call), returns)).toBe(true);
      });
    });
    (properties.sign.length === 0 ? describe.todo : describe)('sign', () => {
      it.each(properties.sign)('satisfies sign($call.0) == $returns', ({ call, returns }) => {
        expect(subject['=='](subject.sign(...call), returns)).toBe(true);
      });
    });
  };
}
