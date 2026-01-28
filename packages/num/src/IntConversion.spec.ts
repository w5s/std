import { describe, expect, it } from 'vitest';
import { IntConversion } from './IntConversion.js';
import { Bounded } from './IntConversion/Bounded.js';

describe('IntConversion', () => {
  it('should reexport sub namespaces', () => {
    expect(IntConversion).toEqual(
      expect.objectContaining({
        Bounded,
      }),
    );
  });
});
