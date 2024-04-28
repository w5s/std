import { define } from './define.js';

/**
 * String Type and Codec definition
 *
 * @namespace
 */
export const String = define<string>({
  typeName: 'String',
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'string';
  },
  codecSchema: () => ({ type: 'string' }),
});
