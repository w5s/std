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
      return {
        // eslint-disable-next-line unicorn/prefer-at
        inferiorBase: values[values.length - 1]!,
        inferiorValues: values.slice(1, -1),
      };
    };
    const superiorData = () => {
      const values = ordered();
      return {
        superiorBase: values[0]!,
        superiorValues: values.slice(1),
      };
    };

    describe('.compare', () => {
      const { superiorBase, superiorValues } = superiorData();
      it.each(superiorValues)('should return -1 when left < right', (superiorValue) => {
        expect(subject.compare(superiorBase, superiorValue)).toBeLessThan(0);
      });
      it.each(equivalent())('should return 0 when left == right', ({ left, right }) => {
        // const [left, right] = args;
        // expect(args).toEqual([]);
        expect(subject.compare(left, right)).toBe(0);
      });
      const { inferiorBase, inferiorValues } = inferiorData();
      it.each(inferiorValues)('should return 1 when left > right', (inferiorValue) => {
        expect(subject.compare(inferiorBase, inferiorValue)).toBeGreaterThan(0);
      });
    });

    const equalData = inferiorData();
    describeEqual({ describe, it, expect })(subject, {
      equivalent: equivalentDefault,
      different: () => equalData.inferiorValues.map((equalValue) => [equalValue, equalData.inferiorBase]),
    });

    describe('<', () => {
      const { superiorBase, superiorValues } = superiorData();
      it.each(superiorValues)('should return true when left < right', (superiorValue) => {
        expect(subject['<'](superiorBase, superiorValue)).toBe(true);
      });
      it.each(equivalent())('should return false when left == right', ({ left, right }) => {
        expect(subject['<'](left, right)).toBe(false);
      });
      const { inferiorBase, inferiorValues } = inferiorData();
      it.each(inferiorValues)('should return false when left > right', (inferiorValue) => {
        expect(subject['<'](inferiorBase, inferiorValue)).toBe(false);
      });
    });
    describe('<=', () => {
      const { superiorBase, superiorValues } = superiorData();
      it.each(superiorValues)('should return true when left < right', (superiorValue) => {
        expect(subject['<='](superiorBase, superiorValue)).toBe(true);
      });
      it.each(equivalent())('should return true when left == right', ({ left, right }) => {
        expect(subject['<='](left, right)).toBe(true);
      });
      const { inferiorBase, inferiorValues } = inferiorData();
      it.each(inferiorValues)('should return false when left > right', (inferiorValue) => {
        expect(subject['<='](inferiorBase, inferiorValue)).toBe(false);
      });
    });
    describe('>', () => {
      const { superiorBase, superiorValues } = superiorData();
      it.each(superiorValues)('should return false when left < right', (superiorValue) => {
        expect(subject['>'](superiorBase, superiorValue)).toBe(false);
      });
      it.each(equivalent())('should return false when left == right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(false);
      });
      const { inferiorBase, inferiorValues } = inferiorData();
      it.each(inferiorValues)('should return true when left > right', (inferiorValue) => {
        expect(subject['>'](inferiorBase, inferiorValue)).toBe(true);
      });
    });
    describe('>=', () => {
      const { superiorBase, superiorValues } = superiorData();
      it.each(superiorValues)('should return true when left < right', (superiorValue) => {
        expect(subject['>'](superiorBase, superiorValue)).toBe(false);
      });
      it.each(equivalent())('should return false when left == right', ({ left, right }) => {
        expect(subject['>'](left, right)).toBe(false);
      });
      const { inferiorBase, inferiorValues } = inferiorData();
      it.each(inferiorValues)('should return false when left > right', (inferiorValue) => {
        expect(subject['>'](inferiorBase, inferiorValue)).toBe(true);
      });
    });
  };
}
