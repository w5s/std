import { describe, it, expect } from 'vitest';
import { ANSICode } from './ANSICode.js';
import { strip } from './ANSICode/strip.js';
import { format } from './ANSICode/format.js';
import { wrap } from './ANSICode/wrap.js';
import { color } from './ANSICode/color.js';
import { fontStyle } from './ANSICode/fontStyle.js';
import { fontWeight } from './ANSICode/fontWeight.js';
import { style } from './ANSICode/style.js';

describe('ANSICode', () => {
  it('is an alias to functions', () => {
    expect(ANSICode).toEqual(
      expect.objectContaining({
        color,
        fontWeight,
        fontStyle,
        format,
        strip,
        style,
        wrap,
      }),
    );
  });
});
