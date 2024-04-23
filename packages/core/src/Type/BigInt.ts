import { Type } from '../Type.js';

export const BigInt = Type.define<bigint>({
  typeName: 'BigInt',
  hasInstance(anyValue: unknown): anyValue is bigint {
    return typeof anyValue === 'bigint';
  },
});
