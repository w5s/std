import { describe, test, expect } from '@jest/globals';
import { Ref } from './ref.js';

describe(Ref, () => {
  test('should return the current value', () => {
    expect(Ref(123)).toEqual({ [Ref.current]: 123 });
  });
  describe(Ref.read, () => {
    test('should return current value', () => {
      const ref = Ref(123);
      expect(Ref.read(ref)).toEqual(123);
    });
  });
  describe(Ref.write, () => {
    test('should set current value', () => {
      const ref = Ref(123);
      Ref.write(ref, 456);
      expect(ref).toEqual({ [Ref.current]: 456 });
    });
  });
});
