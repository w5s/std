import type { Option } from '../Option.js';

import { Symbol } from '../Symbol.js';
import { define } from './define.js';

function parse(expression: string): Option<RegExp> {
  if (expression === '') {
    return /(?:)/;
  }
  try {
    const match = expression.match(/(\/?)(.+)\1([a-z]*)/i);
    if (match != null) {
      // eslint-disable-next-line ts/no-non-null-assertion
      return new globalThis.RegExp(match[2]!, match[3]);
    }
  } catch {
    // Do nothing
  }
  return undefined;
}

/**
 * RegExp Type and Codec definition
 *
 * @namespace
 */
export const RegExp = {
  ...define<RegExp>({
    hasInstance: (anyValue) => Object.prototype.toString.call(anyValue) === '[object RegExp]',
    [Symbol.decode]: (input, { error, ok }) => {
      if (typeof input === 'string') {
        const result = parse(input);
        if (result != null) {
          return ok(result);
        }
      }
      return error(input, 'RegExp');
    },
    [Symbol.encode]: (input) => `${input.toString()}`,
    [Symbol.schema]: () => ({ format: 'regex', type: 'string' }),
    typeName: 'RegExp',
  }),

  /**
   * Parse a RegExp
   *
   * @example
   * ```typescript
   * RegExp.parse('/^[a-z]+$/i');// Option.Some(/^[a-z]+$/i);
   * ```
   * @param expression
   */
  parse,
};
