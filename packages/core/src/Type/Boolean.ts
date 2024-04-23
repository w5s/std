import { Type } from '../Type.js';

export const Boolean = Type.define<boolean>({
  typeName: 'Boolean',
  hasInstance(anyValue: unknown): anyValue is boolean {
    return typeof anyValue === 'boolean';
  },
  codecSchema: () => ({ type: 'boolean' }),
});
