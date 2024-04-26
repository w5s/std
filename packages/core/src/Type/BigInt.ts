import { define } from './define.js';

export const BigInt = define<bigint>({
  typeName: 'BigInt',
  hasInstance(anyValue: unknown): anyValue is bigint {
    return typeof anyValue === 'bigint';
  },
});
