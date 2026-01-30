import { describe, expect, it } from 'vitest';
import { IntConversion } from './IntConversion.js';
import { Bounded } from './IntConversion/Bounded.js';
import { Comparable } from './IntConversion/Comparable.js';
import { Negate } from './IntConversion/Negate.js';
import { Zero } from './IntConversion/Zero.js';

describe('IntConversion', () => {
  it('should reexport sub namespaces', () => {
    expect(IntConversion).toEqual(
      expect.objectContaining({
        Bounded,
        Comparable,
        Negate,
        Zero,
      }),
    );
  });
});
