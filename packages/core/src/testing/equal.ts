import type { Equal } from '../equal.js';
import type { TestingLibrary } from './type.js';

export function describeEqual({ describe, it, expect }: TestingLibrary) {
  return <T>(
    subject: Equal<T>,
    properties: {
      equivalent: () => [T, T][];
      different: () => [T, T][];
    }
  ) => {
    const { equivalent: equivalentDefault, different: differentDefault } = properties;
    const equivalent = () => equivalentDefault().map(([left, right]) => ({ left, right }));
    const different = () => differentDefault().map(([left, right]) => ({ left, right }));

    describe('==', () => {
      it.each(equivalent())('should return true when left == right', ({ left, right }) => {
        expect(subject['=='](left, right)).toBe(true);
      });
      it.each(equivalent())('should return true when right == left', ({ left, right }) => {
        expect(subject['=='](right, left)).toBe(true);
      });
      it.each(different())('should return false when left != right', ({ left, right }) => {
        expect(subject['=='](left, right)).toBe(false);
      });
      it.each(different())('should return false when right != left', ({ left, right }) => {
        expect(subject['=='](right, left)).toBe(false);
      });
    });
    describe('!=', () => {
      it.each(different())('should return false when left != right', ({ left, right }) => {
        expect(subject['!='](left, right)).toBe(true);
      });
      it.each(different())('should return false when right != left', ({ left, right }) => {
        expect(subject['!='](right, left)).toBe(true);
      });
      it.each(equivalent())('should return true when left == right', ({ left, right }) => {
        expect(subject['!='](left, right)).toBe(false);
      });
      it.each(equivalent())('should return true when right == left', ({ left, right }) => {
        expect(subject['!='](right, left)).toBe(false);
      });
    });
  };
}
