import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * Number Type and Codec definition
 *
 * @namespace
 */
export const number = define<number>({
  typeName: 'number',
  hasInstance: (anyValue) => typeof anyValue === 'number',
  [Symbol.schema]: () => ({ type: 'number' }),
});
