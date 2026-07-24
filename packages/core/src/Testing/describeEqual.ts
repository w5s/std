import type { EqualsInterface } from '../Equal.js';
import type { TestingLibrary } from './type.js';

import { defaultTestingLibrary } from './defaultTestingLibrary.js';

export function describeEqual<T>(
  subject: EqualsInterface<T>,
  properties: {
    different: () => Array<[T, T]>;
    equivalent: () => Array<[T, T]>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, expect, it } = testingLibrary;
  const { different: differentDefault, equivalent: equivalentDefault } = properties;
  const equivalent = () => equivalentDefault().map(([left, right]) => ({ left, right }));
  const different = () => differentDefault().map(([left, right]) => ({ left, right }));

  describe('equals', () => {
    it.each(equivalent())('($left, $right) returns true // left == right', ({ left, right }) => {
      expect(subject.equals(left, right)).toBe(true);
    });
    it.each(equivalent())('($right, $left) returns true // left == right', ({ left, right }) => {
      expect(subject.equals(right, left)).toBe(true);
    });
    it.each(different())('($left, $right) returns false // left != right', ({ left, right }) => {
      expect(subject.equals(left, right)).toBe(false);
    });
    it.each(different())('($right, $left) returns false // right != left', ({ left, right }) => {
      expect(subject.equals(right, left)).toBe(false);
    });
  });
}
