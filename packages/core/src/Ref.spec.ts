import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core-type';
import { Ref } from './Ref.js';
import { property } from './Ref/property.js';
import { modify } from './Ref/modify.js';
import { read } from './Ref/read.js';
import { write } from './Ref/write.js';

describe('Ref', () => {
  const anyValue = 123;
  it('is an alias to functions', () => {
    expect(Ref).toEqual(
      expect.objectContaining({
        read,
        modify,
        property,
        write,
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
});
