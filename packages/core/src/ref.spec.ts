import { describe, it, expect } from '@jest/globals';
import { Ref } from './ref.js';
import { assertType } from './type.js';

describe(Ref, () => {
  const anyValue = 123;
  it('should return the current value', () => {
    expect(Ref(anyValue)).toEqual({ [Ref.current]: anyValue });
  });
  describe(Ref.hasInstance, () => {
    it.each([
      [Ref(anyValue), true],
      [
        {
          get current() {
            return undefined;
          },
        },
        true,
      ],
      [null, false],
      [undefined, false],
    ])('should return true for Ref', (object, expected) => {
      expect(Ref.hasInstance(object)).toEqual(expected);
    });
    it('should refine type', () => {
      const unknownValue: unknown = Ref(anyValue);
      if (Ref.hasInstance(unknownValue)) {
        assertType<typeof unknownValue, Ref<unknown>>(true);
      }
    });
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
