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
});
