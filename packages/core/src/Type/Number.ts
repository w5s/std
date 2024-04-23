import { Type } from '../Type.js';

export const Number = Type.define<number>({
  typeName: 'Number',
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'number';
  },
  codecSchema: () => ({ type: 'number' }),
});
