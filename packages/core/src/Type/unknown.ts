import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * Unknown (i.e. unsafe) type and codec
 */
export const unknown = define<unknown>({
  typeName: 'unknown',
  hasInstance: (_value) => true,
  [Symbol.encode]: (input) => input,
  [Symbol.decode]: (input, { ok }) => ok(input),
  [Symbol.schema]: () => ({
    type: 'any',
  }),
});
