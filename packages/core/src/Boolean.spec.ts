import { describe, it, expect } from 'vitest';
import { Boolean } from './Boolean.js';
import { assertType, describeComparable } from './testing.js';

describe('Boolean', () => {
  describe('.hasInstance', () => {
    it('should return true for string', () => {
      expect(Boolean.hasInstance(true)).toEqual(true);
    });
    it('should return false for any other value', () => {
      expect(Boolean.hasInstance(null)).toBe(false);
      expect(Boolean.hasInstance({ length: 0 })).toBe(false);
    });
    it('should refine type', () => {
      const someValue = 'true' as string | boolean;

      if (Boolean.hasInstance(someValue)) {
        assertType<typeof someValue, boolean>(true);
      } else {
        assertType<typeof someValue, string>(true);
      }
    });
  });

  describeComparable({ describe, it, expect })(Boolean, {
    ordered: () => [false, true],
    equivalent: () => [
      [true, true],
      [false, false],
    ],
  });
});
