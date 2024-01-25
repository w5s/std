/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Comparable } from '../comparable.js';
import { describeEqual } from './equal.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Comparable behavior
 *
 * @example
 * ```ts
 * describeComparable({ describe, it, expect })(Number, {
 *   ordered: () => [-1, 0, 1], // A list of ordered values
 *   equivalent: () => [
 *     [0, 0],
 *     [1, 1],
 *     [1.1, 1.1],
 *   ], // A list of [left, right] equals tuples
 * });
 *
 * ```
 * @param testingLibrary
 */
export function describeComparable({ describe, it, expect }: TestingLibrary) {
  return <T>(
    subject: Comparable<T>,
    properties: {
      ordered: () => T[];
      equivalent: () => [T, T][];
    }
  ) => {
    const { equivalent: equivalentDefault, ordered } = properties;
    const equivalent = () => equivalentDefault().map(([left, right]) => ({ left, right }));
    const inferiorData = () => {
      const values = ordered();
      // eslint-disable-next-line unicorn/prefer-at
      const inferiorBase = values[values.length - 1]!;
      const inferiorValues = values.slice(1, -1);
      return inferiorValues.map((inferiorValue) => ({ left: inferiorBase, right: inferiorValue }));
    };
    const superiorData = () => {
      const values = ordered();
      const superiorValues = values.slice(1);
      const superiorBase = values[0]!;
      return superiorValues.map((superiorValue) => ({ left: superiorBase, right: superiorValue }));
    };

    describe('.compare', () => {
      it.each(superiorData())('should return -1 when $left < $right', ({ left, right }) => {
        expect(subject.compare(left, right)).toBeLessThan(0);
      });
      it.each(equivalent())('should return 0 when $left == $right', ({ left, right }) => {
        // const [left, right] = args;
        // expect(args).toEqual([]);
        expect(subject.compare(left, right)).toBe(0);
      });
      it.each(inferiorData())('should return 1 when $left > $right', ({ left, right }) => {
        expect(subject.compare(left, right)).toBeGreaterThan(0);
      });
    });

    const equalData = inferiorData();
    describeEqual({ describe, it, expect })(subject, {
      equivalent: equivalentDefault,
      different: () => equalData.map(({ left, right }) => [left, right]),
    });

    describe('<', () => {
      it.each(superiorData())('($left, $right) returns true // left < right', ({ left, right }) => {
        expect(subject['<'](left, right)).toBe(true);
      });
      it.each(equivalent())('($left, $right) returns false // left == right', ({ left, right }) => {
        expect(subject['<'](left, right)).toBe(false);
      });
      it.each(inferiorData())('($left, $right) returns false // left > right', ({ left, right }) => {
        expect(subject['<'](left, right)).toBe(false);
      });
    });
    describe('<=', () => {
      it.each(superiorData())('($left, $right) returns true // left < right', ({ left, right }) => {
        expect(subject['<='](left, right)).toBe(true);
      });
      it.each(equivalent())('($left, $right) returns true // left == right', ({ left, right }) => {
        expect(subject['<='](left, right)).toBe(true);
      });
      it.each(inferiorData())('($left, $right) returns false // left > right', ({ left, right }) => {
        expect(subject['<='](left, right)).toBe(false);
      });
    });
    describe('>', () => {
      it.each(superiorData())('($left, $right) returns false // left < right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(false);
      });
      it.each(equivalent())('($left, $right) returns false // left == right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(false);
      });
      it.each(inferiorData())('($left, $right) returns true // left > right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(true);
      });
    });
    describe('>=', () => {
      it.each(superiorData())('($left, $right) return true // left < right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(false);
      });
      it.each(equivalent())('($left, $right) return false // left == right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(false);
      });
      it.each(inferiorData())('($left, $right) return false // left > right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(true);
      });
    });
  };
}
