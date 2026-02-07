import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core-type';
import { Ref } from './Ref.js';
import { property } from './Ref/property.js';

describe('Ref', () => {
  const anyValue = 123;
  it('is an alias to functions', () => {
    expect(Ref).toEqual(
      expect.objectContaining({
        property,
      }),
    );
  });
  it('should return the current value', () => {
    expect(Ref(anyValue)).toEqual({ [Ref.current]: anyValue });
  });
  describe('.hasInstance', () => {
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
      [() => {}, false],
      ['string', false],
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
  describe('.read', () => {
    it('should return current value', () => {
      const ref = Ref(123);
      expect(Ref.read(ref)).toEqual(123);
    });
  });
  describe('.write', () => {
    it('should set current value', () => {
      const ref = Ref(123);
      Ref.write(ref, 456);
      expect(ref).toEqual({ [Ref.current]: 456 });
    });
  });
  describe('.modify', () => {
    it('should set current value using map function', () => {
      const ref = Ref(123);
      Ref.modify(ref, (_) => _ * 2);
      expect(ref).toEqual({ [Ref.current]: 246 });
    });
  });
});
