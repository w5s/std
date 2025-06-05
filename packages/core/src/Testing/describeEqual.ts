import type { Equal } from '../Equal.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

export function describeEqual<T>(
  subject: Equal<T>,
  properties: {
    equivalent: () => [T, T][];
    different: () => [T, T][];
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const { equivalent: equivalentDefault, different: differentDefault } = properties;
  const equivalent = () => equivalentDefault().map(([left, right]) => ({ left, right }));
  const different = () => differentDefault().map(([left, right]) => ({ left, right }));

  describe('==', () => {
    it.each(equivalent())('($left, $right) returns true // left == right', ({ left, right }) => {
      expect(subject['=='](left, right)).toBe(true);
    });
    it.each(equivalent())('($right, $left) returns true // left == right', ({ left, right }) => {
      expect(subject['=='](right, left)).toBe(true);
    });
    it.each(different())('($left, $right) returns false // left != right', ({ left, right }) => {
      expect(subject['=='](left, right)).toBe(false);
    });
    it.each(different())('($right, $left) returns false // right != left', ({ left, right }) => {
      expect(subject['=='](right, left)).toBe(false);
    });
  });
  describe('!=', () => {
    it.each(different())('($left, $right) returns false // left != right', ({ left, right }) => {
      expect(subject['!='](left, right)).toBe(true);
    });
    it.each(different())('($left, $right) returns false // right != left', ({ left, right }) => {
      expect(subject['!='](right, left)).toBe(true);
    });
    it.each(equivalent())('($left, $right) returns true // left == right', ({ left, right }) => {
      expect(subject['!='](left, right)).toBe(false);
    });
    it.each(equivalent())('($left, $right) returns true // right == left', ({ left, right }) => {
      expect(subject['!='](right, left)).toBe(false);
    });
  });
}
