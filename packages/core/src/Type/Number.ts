import { define } from './define.js';

export const Number = define<number>({
  typeName: 'Number',
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'number';
  },
  codecSchema: () => ({ type: 'number' }),
});
