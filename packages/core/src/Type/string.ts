import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * String Type and Codec definition
 *
 * @namespace
 */
export const string = define<string>({
  typeName: 'string',
  hasInstance: (anyValue) => typeof anyValue === 'string',
  [Symbol.schema]: () => ({ type: 'string' }),
});
