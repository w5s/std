import { describe, it, expect } from '@jest/globals';
import { Ref } from './ref.js';

describe(Ref, () => {
  it('should return the current value', () => {
    expect(Ref(123)).toEqual({ [Ref.current]: 123 });
  });
  describe(Ref.read, () => {
    it('should return current value', () => {
      const ref = Ref(123);
      expect(Ref.read(ref)).toEqual(123);
    });
  });
  describe(Ref.write, () => {
    it('should set current value', () => {
      const ref = Ref(123);
      Ref.write(ref, 456);
      expect(ref).toEqual({ [Ref.current]: 456 });
    });
  });
  describe(Ref.modify, () => {
    it('should set current value using map function', () => {
      const ref = Ref(123);
      Ref.modify(ref, (_) => _ * 2);
      expect(ref).toEqual({ [Ref.current]: 246 });
    });
  });
});
