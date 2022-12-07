// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';
import type { Comparable } from '@w5s/core';

export function describeComparable<T>(
  subject: Comparable<T>,
  properties: {
    base: () => T;
    inferior: () => T | T[];
    superior: () => T | T[];
  }
) {
  const { base, inferior, superior } = properties;
  const toArray = (arrayOrValue: T | T[]) => (Array.isArray(arrayOrValue) ? arrayOrValue : [arrayOrValue]);

  describe('.compare', () => {
    it.each(toArray(superior()))('should return -1 when left < right', (superiorValue) => {
      expect(subject.compare(base(), superiorValue)).toBeLessThan(0);
    });
    it('should return 0 when left == right', () => {
      expect(subject.compare(base(), base())).toBe(0);
    });
    it.each(toArray(inferior()))('should return 1 when left > right', (inferiorValue) => {
      expect(subject.compare(base(), inferiorValue)).toBeGreaterThan(0);
    });
  });
  describe('==', () => {
    it('should return true if code are identical', () => {
      const left = base();
      const right = left;
      expect(subject['=='](left, right)).toBe(true);
    });
    it.each(toArray(superior()))('should return false when left < right', (superiorValue) => {
      expect(subject['=='](base(), superiorValue)).toBe(false);
    });
    it('should return true when left == right', () => {
      expect(subject['=='](base(), base())).toBe(true);
    });
    it.each(toArray(inferior()))('should return false when left > right', (inferiorValue) => {
      expect(subject['=='](base(), inferiorValue)).toBe(false);
    });
  });
  describe('!=', () => {
    it('should return false if code are identical', () => {
      const left = base();
      const right = left;
      expect(subject['!='](left, right)).toBe(false);
    });
    it.each(toArray(superior()))('should return true when left < right', (superiorValue) => {
      expect(subject['!='](base(), superiorValue)).toBe(true);
    });
    it('should return false when left == right', () => {
      expect(subject['!='](base(), base())).toBe(false);
    });
    it.each(toArray(inferior()))('should return false when left > right', (inferiorValue) => {
      expect(subject['!='](base(), inferiorValue)).toBe(true);
    });
  });
  describe('<', () => {
    it.each(toArray(superior()))('should return true when left < right', (superiorValue) => {
      expect(subject['<'](base(), superiorValue)).toBe(true);
    });
    it('should return false when left == right', () => {
      expect(subject['<'](base(), base())).toBe(false);
    });
    it.each(toArray(inferior()))('should return false when left > right', (inferiorValue) => {
      expect(subject['<'](base(), inferiorValue)).toBe(false);
    });
  });
  describe('<=', () => {
    it.each(toArray(superior()))('should return true when left < right', (superiorValue) => {
      expect(subject['<='](base(), superiorValue)).toBe(true);
    });
    it('should return true when left == right', () => {
      expect(subject['<='](base(), base())).toBe(true);
    });
    it.each(toArray(inferior()))('should return false when left > right', (inferiorValue) => {
      expect(subject['<='](base(), inferiorValue)).toBe(false);
    });
  });
  describe('>', () => {
    it.each(toArray(superior()))('should return false when left < right', (superiorValue) => {
      expect(subject['>'](base(), superiorValue)).toBe(false);
    });
    it('should return false when left == right', () => {
      expect(subject['>'](base(), base())).toBe(false);
    });
    it.each(toArray(inferior()))('should return true when left > right', (inferiorValue) => {
      expect(subject['>'](base(), inferiorValue)).toBe(true);
    });
  });
  describe('>=', () => {
    it.each(toArray(superior()))('should return true when left < right', (superiorValue) => {
      expect(subject['>'](base(), superiorValue)).toBe(false);
    });
    it('should return false when left == right', () => {
      expect(subject['>'](base(), base())).toBe(false);
    });
    it.each(toArray(inferior()))('should return false when left > right', (inferiorValue) => {
      expect(subject['>'](base(), inferiorValue)).toBe(true);
    });
  });
}
