import { define } from './define.js';

/**
 * Number Type and Codec definition
 *
 * @namespace
 */
export const Number = define<number>({
  typeName: 'Number',
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'number';
  },
  codecSchema: () => ({ type: 'number' }),
});
