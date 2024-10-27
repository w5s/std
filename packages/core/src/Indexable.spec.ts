import { describe, it, expect, vi } from 'vitest';
import type { Int } from '@w5s/core';
import { Indexable } from './Indexable.js';

describe(Indexable, () => {
  const anyIndexOf = vi.fn();
  const anyAt = vi.fn();
  const defaultIndexable = {
    indexOf: anyIndexOf,
    at: anyAt,
  };
  const charIndexable = Indexable<string>({
    indexOf(value) {
      return value.codePointAt(0) as Int;
    },
    at: (index) => String.fromCodePoint(index),
  });

  describe('#at', () => {
    it('should return the result of the at function', () => {
      const at = vi.fn();
      const rangeIndexable = Indexable<string>({
        ...defaultIndexable,
        at,
      });

      expect(rangeIndexable.at).toBe(at);
    });
  });
  describe('#indexOf', () => {
    it('should return the result of the indexOf function', () => {
      const indexOf = vi.fn();
      const rangeIndexable = Indexable<string>({
        ...defaultIndexable,
        indexOf,
      });

      expect(rangeIndexable.indexOf).toBe(indexOf);
    });
  });
  describe('#rangeSize', () => {
    it('is an alias to parameter.rangeSize if passed', () => {
      const rangeSize = vi.fn();
      const rangeIndexable = Indexable<string>({
        ...defaultIndexable,
        rangeSize,
      });

      expect(rangeIndexable.rangeSize).toBe(rangeSize);
    });
    it('has a default implementation', () => {
      expect(charIndexable.rangeSize('a', 'e')).toBe(5);
    });
  });
  describe('#range', () => {
    it('is an alias to parameter.range if passed', () => {
      const range = vi.fn();
      const rangeIndexable = Indexable<string>({
        ...defaultIndexable,
        range,
      });

      expect(rangeIndexable.range).toBe(range);
    });
    it('has a default implementation', () => {
      expect([...charIndexable.range('a', 'e')]).toEqual(['a', 'b', 'c', 'd', 'e']);
    });
  });
});
