import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import { Ref } from './Ref.js';
import { modify } from './Ref/modify.js';
import { property } from './Ref/property.js';
import { read } from './Ref/read.js';
import { write } from './Ref/write.js';

describe('Ref', () => {
  const anyValue = 123;
  it('is an alias to functions', () => {
    expect(Ref).toEqual(
      expect.objectContaining({
        modify,
        property,
        read,
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
