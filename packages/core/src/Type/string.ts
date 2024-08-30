import { define } from './define.js';

/**
 * String Type and Codec definition
 *
 * @namespace
 */
export const string = define<string>({
  typeName: 'string',
  hasInstance: (anyValue) => typeof anyValue === 'string',
  codecSchema: () => ({ type: 'string' }),
});
