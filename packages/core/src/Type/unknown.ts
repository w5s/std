import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * Unknown (i.e. unsafe) type and codec
 */
export const unknown = define<unknown>({
  hasInstance: (_value) => true,
  [Symbol.decode]: (input, { ok }) => ok(input),
  [Symbol.encode]: (input) => input,
  [Symbol.schema]: () => ({
    type: 'any',
  }),
  typeName: 'unknown',
});
