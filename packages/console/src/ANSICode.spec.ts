import { describe, expect, it } from 'vitest';

import { ANSICode } from './ANSICode.js';
import { color } from './ANSICode/color.js';
import { fontStyle } from './ANSICode/fontStyle.js';
import { fontWeight } from './ANSICode/fontWeight.js';
import { format } from './ANSICode/format.js';
import { strip } from './ANSICode/strip.js';
import { style } from './ANSICode/style.js';
import { wrap } from './ANSICode/wrap.js';

describe('ANSICode', () => {
  it('is an alias to functions', () => {
    expect(ANSICode).toEqual(
      expect.objectContaining({
        color,
        fontStyle,
        fontWeight,
        format,
        strip,
        style,
        wrap,
      }),
    );
  });
});
