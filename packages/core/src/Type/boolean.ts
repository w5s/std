import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * Boolean Type and Codec definition
 *
 * @namespace
 */
export const boolean = define<boolean>({
  typeName: 'boolean',
  hasInstance: (anyValue) => typeof anyValue === 'boolean',
  [Symbol.schema]: () => ({ type: 'boolean' }),
});
