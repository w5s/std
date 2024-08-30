import { define } from './define.js';

/**
 * Unknown (i.e. unsafe) type and codec
 */
export const unknown = define<unknown>({
  typeName: 'unknown',
  hasInstance: (_value) => true,
  codecEncode: (input) => input,
  codecDecode: (input, { ok }) => ok(input),
  codecSchema: () => ({
    type: 'any',
  }),
});
