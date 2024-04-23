import { Type } from '../Type.js';

export const String = Type.define<string>({
  typeName: 'String',
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'string';
  },
  codecSchema: () => ({ type: 'string' }),
});
