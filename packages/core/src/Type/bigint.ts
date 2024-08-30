import { define } from './define.js';

/**
 * BigInt Type and Codec definition
 *
 * @namespace
 */
export const bigint = define<bigint>({
  typeName: 'bigint',
  hasInstance: (anyValue) => typeof anyValue === 'bigint',
  codecEncode: (input) => `${input.toString(10)}n`,
  codecDecode: (input, { ok, error }) => {
    if (typeof input === 'string' && input.endsWith('n')) {
      try {
        return ok(globalThis.BigInt(input.slice(0, -1)));
      } catch {
        // do nothing, let it return an error
      }
    }
    return error(input, 'bigint');
  },
  codecSchema: () => ({ type: 'string', format: 'bigint' }),
});
