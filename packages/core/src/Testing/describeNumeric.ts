import type { Equal } from '../Equal.js';
import type { Numeric } from '../Numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Comparable behavior
 *
 * @example
 * ```ts
 * describeNumeric({ describe, it, expect })(Number, {
 *   '+': [
 *     { call: [1, 1], returns: 2 },
 *     // ...
 *   ],
 *   '-': [
 *     { call: [1, 1], returns: 0 },
 *     // ...
 *   ],
 *   '*': [
 *     { call: [1, 1], returns: 1 },
 *     // ...
 *   ],
 * });
 *
 * ```
 * @param testingLibrary
 */
export function describeNumeric({ describe, it, expect }: TestingLibrary) {
  return <T>(
    subject: Numeric<T> & Equal<T>,
    properties: {
      '+': Array<{ call: [T, T]; returns: T }>;
      '-': Array<{ call: [T, T]; returns: T }>;
      '*': Array<{ call: [T, T]; returns: T }>;
    }
  ) => {
    (properties['+'].length === 0 ? describe.todo : describe)('+', () => {
      it.each(properties['+'])("satisfies ['+']($call.0, $call.1) == $returns", ({ call, returns }) => {
        expect(subject['=='](subject['+'](...call), returns)).toBe(true);
      });
    });
    (properties['-'].length === 0 ? describe.todo : describe)('-', () => {
      it.each(properties['-'])("satisfies ['-']($call.0, $call.1) == $returns", ({ call, returns }) => {
        expect(subject['=='](subject['-'](...call), returns)).toBe(true);
      });
    });
    (properties['*'].length === 0 ? describe.todo : describe)('*', () => {
      it.each(properties['*'])("satisfies ['*']($call.0, $call.1) == $returns", ({ call, returns }) => {
        expect(subject['=='](subject['*'](...call), returns)).toBe(true);
      });
    });
  };
}
