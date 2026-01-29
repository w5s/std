import { describe, expect, it } from 'vitest';
import { NumberConversion } from './NumberConversion.js';
import { Bounded } from './NumberConversion/Bounded.js';
import { Comparable } from './NumberConversion/Comparable.js';
import { Negate } from './NumberConversion/Negate.js';

describe('NumberConversion', () => {
  it('should reexport sub namespaces', () => {
    expect(NumberConversion).toEqual(
      expect.objectContaining({
        Bounded,
        Comparable,
        Negate,
      }),
    );
  });
});
