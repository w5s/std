import { describe, it, expect, jest } from '@jest/globals';
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
    it('should not set value if strict equal', () => {
      const anyValue = 123;
      const spy = jest.fn();
      const ref = {
        get [Ref.current]() {
          return anyValue;
        },
        set [Ref.current](value) {
          spy(value);
        },
      };
      Ref.write(ref, anyValue);
      expect(spy).not.toHaveBeenCalled();
    });
    it('should not set value if NaN', () => {
      const anyValue = Number.NaN;
      const spy = jest.fn();
      const ref = {
        get [Ref.current]() {
          return anyValue;
        },
        set [Ref.current](value) {
          spy(value);
        },
      };
      Ref.write(ref, anyValue);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
