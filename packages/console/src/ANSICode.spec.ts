import { describe, it, expect } from 'vitest';
import { ANSICode } from './ANSICode.js';
import { strip } from './ANSICode/strip.js';
import { format } from './ANSICode/format.js';
import { wrap } from './ANSICode/wrap.js';
import { color } from './ANSICode/color.js';
import { fontWeight } from './ANSICode/fontWeight.js';

describe('ANSICode', () => {
  it('is an alias to functions', () => {
    expect(ANSICode).toEqual(
      expect.objectContaining({
        color,
        fontWeight,
        format,
        strip,
        wrap,
      }),
    );
  });
});
