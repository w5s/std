import { Symbol } from '../Symbol.js';
import type { Tag } from '../Tag.js';
import { define } from '../Tag/define.js';

/**
 * URL string type
 */
export type URL = string & Tag<'URL'>;

/**
 * URL Type and Codec definition
 *
 * @namespace
 */
export const URL = define<string, URL>({
  typeName: 'URL',
  hasInstance: (anyValue) => {
    if (typeof anyValue === 'string') {
      try {
        // eslint-disable-next-line no-new
        new globalThis.URL(anyValue);
        return true;
        // eslint-disable-next-line no-empty
      } catch {}
    }
    return false;
  },
  [Symbol.schema]: () => ({
    type: 'string',
    format: 'url',
  }),
});
