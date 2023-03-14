import type { Comparable } from '@w5s/core';

export interface TestingLibrary {
  describe: (description: string, fn: () => void) => void;
  it: {
    (description: string, fn: () => void): void;
    each: <T>(values: ReadonlyArray<T>) => (description: string, fn: (value: T) => void) => void;
  };
  expect: <V>(value: V) => {
    toBeLessThan: (anyValue: any) => void;
    toBeGreaterThan: (anyValue: any) => void;
    toBe: (anyValue: unknown) => void;
  };
}

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
    describe('==', () => {
      const baseValue = base();
      it('should return true if code are identical', () => {
        const left = baseValue;
        const right = left;
        expect(subject['=='](left, right)).toBe(true);
      });
      it.each(toArray(superior(baseValue)))('should return false when left < right', (superiorValue) => {
        expect(subject['=='](baseValue, superiorValue)).toBe(false);
      });
      it('should return true when left == right', () => {
        expect(subject['=='](baseValue, base())).toBe(true);
      });
      it.each(toArray(inferior(baseValue)))('should return false when left > right', (inferiorValue) => {
        expect(subject['=='](baseValue, inferiorValue)).toBe(false);
      });
    });
    describe('!=', () => {
      const baseValue = base();

      it('should return false if code are identical', () => {
        const left = baseValue;
        const right = left;
        expect(subject['!='](left, right)).toBe(false);
      });
      it.each(toArray(superior(baseValue)))('should return true when left < right', (superiorValue) => {
        expect(subject['!='](baseValue, superiorValue)).toBe(true);
      });
      it('should return false when left == right', () => {
        expect(subject['!='](baseValue, base())).toBe(false);
      });
      it.each(toArray(inferior(baseValue)))('should return false when left > right', (inferiorValue) => {
        expect(subject['!='](baseValue, inferiorValue)).toBe(true);
      });
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
