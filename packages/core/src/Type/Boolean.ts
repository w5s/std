import { define } from './define.js';

/**
 * Boolean Type and Codec definition
 *
 * @namespace
 */
export const Boolean = define<boolean>({
  typeName: 'Boolean',
  hasInstance(anyValue: unknown): anyValue is boolean {
    return typeof anyValue === 'boolean';
  },
  codecSchema: () => ({ type: 'boolean' }),
});
