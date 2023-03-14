import type { Comparable } from '../comparable.js';
import { describeEqual } from './equal.js';
import type { TestingLibrary } from './type.js';

export function describeComparable({ describe, it, expect }: TestingLibrary) {
  return <T>(
    subject: Comparable<T>,
    properties: {
      base: () => T;
      inferior: (base: T) => T | T[];
      superior: (base: T) => T | T[];
    }
  ) => {
    const { base, inferior, superior } = properties;
    const toArray = (arrayOrValue: T | T[]) => (Array.isArray(arrayOrValue) ? arrayOrValue : [arrayOrValue]);

    describe('.compare', () => {
      const baseValue = base();
      it.each(toArray(superior(baseValue)))('should return -1 when left < right', (superiorValue) => {
        expect(subject.compare(baseValue, superiorValue)).toBeLessThan(0);
      });
      it('should return 0 when left == right', () => {
        expect(subject.compare(baseValue, base())).toBe(0);
      });
      it.each(toArray(inferior(baseValue)))('should return 1 when left > right', (inferiorValue) => {
        expect(subject.compare(baseValue, inferiorValue)).toBeGreaterThan(0);
      });
    });

    describeEqual({ describe, it, expect })(subject, {
      base,
      equivalent: base,
      different: (baseValue) => toArray(inferior(baseValue)).concat(toArray(superior(baseValue))),
    });

    describe('<', () => {
      const baseValue = base();

      it.each(toArray(superior(baseValue)))('should return true when left < right', (superiorValue) => {
        expect(subject['<'](baseValue, superiorValue)).toBe(true);
      });
      it('should return false when left == right', () => {
        expect(subject['<'](baseValue, base())).toBe(false);
      });
      it.each(toArray(inferior(baseValue)))('should return false when left > right', (inferiorValue) => {
        expect(subject['<'](baseValue, inferiorValue)).toBe(false);
      });
    });
    describe('<=', () => {
      const baseValue = base();

      it.each(toArray(superior(baseValue)))('should return true when left < right', (superiorValue) => {
        expect(subject['<='](baseValue, superiorValue)).toBe(true);
      });
      it('should return true when left == right', () => {
        expect(subject['<='](baseValue, base())).toBe(true);
      });
      it.each(toArray(inferior(baseValue)))('should return false when left > right', (inferiorValue) => {
        expect(subject['<='](baseValue, inferiorValue)).toBe(false);
      });
    });
    describe('>', () => {
      const baseValue = base();

      it.each(toArray(superior(baseValue)))('should return false when left < right', (superiorValue) => {
        expect(subject['>'](baseValue, superiorValue)).toBe(false);
      });
      it('should return false when left == right', () => {
        expect(subject['>'](baseValue, base())).toBe(false);
      });
      it.each(toArray(inferior(baseValue)))('should return true when left > right', (inferiorValue) => {
        expect(subject['>'](baseValue, inferiorValue)).toBe(true);
      });
    });
    describe('>=', () => {
      const baseValue = base();

      it.each(toArray(superior(baseValue)))('should return true when left < right', (superiorValue) => {
        expect(subject['>'](baseValue, superiorValue)).toBe(false);
      });
      it('should return false when left == right', () => {
        expect(subject['>'](baseValue, base())).toBe(false);
      });
      it.each(toArray(inferior(baseValue)))('should return false when left > right', (inferiorValue) => {
        expect(subject['>'](baseValue, inferiorValue)).toBe(true);
      });
    });
  };
}
