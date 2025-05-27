import { Symbol } from '../Symbol.js';
import type { Tag } from '../Tag.js';
import { define } from '../Tag/define.js';

export type Char = string & Tag<'Char'>;

/**
 * Char is a string of length 1
 *
 * @namespace
 */
export const Char = define<string, Char>({
  typeName: 'Char',
  hasInstance: (anyValue) => typeof anyValue === 'string' && anyValue.length === 1,
  [Symbol.schema]: () => ({
    type: 'string',
    minLength: 1,
    maxLength: 1,
  }),
});
