import { define } from './define.js';

/**
 * Number Type and Codec definition
 *
 * @namespace
 */
export const number = define<number>({
  typeName: 'number',
  hasInstance: (anyValue) => typeof anyValue === 'number',
  codecSchema: () => ({ type: 'number' }),
});
