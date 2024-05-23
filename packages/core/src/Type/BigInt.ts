import { define } from './define.js';

/**
 * BigInt Type and Codec definition
 *
 * @namespace
 */
export const BigInt = define<bigint>({
  typeName: 'BigInt',
  hasInstance(anyValue: unknown): anyValue is bigint {
    return typeof anyValue === 'bigint';
  },
  codecEncode: (input) => `${input.toString(10)}n`,
  codecDecode: (input, { ok, error }) => {
    if (typeof input === 'string' && input.endsWith('n')) {
      try {
        return ok(globalThis.BigInt(input.slice(0, -1)));
      } catch {
        // do nothing, let it return an error
      }
    }
    return error(input, 'BigInt');
  },
  codecSchema: () => ({ type: 'string', format: 'bigint' }),
});
