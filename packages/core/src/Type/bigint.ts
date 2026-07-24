import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * BigInt Type and Codec definition
 *
 * @namespace
 */
export const bigint = define<bigint>({
  hasInstance: (anyValue) => typeof anyValue === 'bigint',
  [Symbol.decode]: (input, { error, ok }) => {
    if (typeof input === 'string' && input.endsWith('n')) {
      try {
        return ok(BigInt(input.slice(0, -1)));
      } catch {
        // do nothing, let it return an error
      }
    }
    return error(input, 'bigint');
  },
  [Symbol.encode]: (input) => `${input.toString(10)}n`,
  [Symbol.schema]: () => ({ format: 'bigint', type: 'string' }),
  typeName: 'bigint',
});
