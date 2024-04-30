import type { Int as IntType } from '../Int.js';
import { define } from '../Tag/define.js';

/**
 * Int Type and Codec definition
 *
 * @namespace
 */
export const Int = define<number, IntType>({
  typeName: 'Int',
  hasInstance(anyValue: unknown): anyValue is IntType {
    return Number.isSafeInteger(anyValue);
  },
  codecSchema: () => ({
    type: 'integer',
  }),
});
