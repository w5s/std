import { strip } from './ANSICode/strip.js';
import { format } from './ANSICode/format.js';
import { wrap } from './ANSICode/wrap.js';
import { color } from './ANSICode/color.js';
import { fontWeight } from './ANSICode/fontWeight.js';

/**
 * @namespace
 */
export const ANSICode = {
  color,
  fontWeight,
  format,
  strip,
  wrap,
};
