import { strip } from './ANSICode/strip.js';
import { format } from './ANSICode/format.js';
import { wrap } from './ANSICode/wrap.js';
import { color } from './ANSICode/color.js';
import { fontWeight } from './ANSICode/fontWeight.js';
import { fontStyle } from './ANSICode/fontStyle.js';

/**
 * @namespace
 */
export const ANSICode = {
  color,
  fontWeight,
  fontStyle,
  format,
  strip,
  wrap,
};
