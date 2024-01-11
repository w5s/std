import type { Equal } from '../equal.js';
import type { Numeric } from '../numeric.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Comparable behavior
 *
 * @example
 * ```ts
 * describeNumeric({ describe, it, expect })(Number, {
 *   abs: [
 *     { call: [-1], returns: 1 },
 *     // ...
 *   ],
 *   sign: [
 *     { call: [-6], returns: -1 },
 *     // ...
 *   ],
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
      abs: Array<{ call: [T]; returns: T }>;
      sign: Array<{ call: [T]; returns: T }>;
      '+': Array<{ call: [T, T]; returns: T }>;
      '-': Array<{ call: [T, T]; returns: T }>;
      '*': Array<{ call: [T, T]; returns: T }>;
    }
  ) => {
    describe('abs', () => {
      it.each(properties.abs)('satisfies abs($call.0) == $returns', ({ call, returns }) => {
        expect(subject['=='](subject.abs(...call), returns)).toBe(true);
      });
    });
    describe('sign', () => {
      it.each(properties.sign)('satisfies sign($call.0) == $returns', ({ call, returns }) => {
        expect(subject['=='](subject.sign(...call), returns)).toBe(true);
      });
    });
    describe('+', () => {
      it.each(properties['+'])("satisfies ['+']($call.0, $call.1) == $returns", ({ call, returns }) => {
        expect(subject['=='](subject['+'](...call), returns)).toBe(true);
      });
    });
    describe('-', () => {
      it.each(properties['-'])("satisfies ['-']($call.0, $call.1) == $returns", ({ call, returns }) => {
        expect(subject['=='](subject['-'](...call), returns)).toBe(true);
      });
    });
    describe('*', () => {
      it.each(properties['*'])("satisfies ['*']($call.0, $call.1) == $returns", ({ call, returns }) => {
        expect(subject['=='](subject['*'](...call), returns)).toBe(true);
      });
    });
  };
}
