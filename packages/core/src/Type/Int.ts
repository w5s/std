import type { Int as IntType } from '../Int.js';
import { Tag } from '../Tag.js';

export const Int = Tag.define<number, IntType>({
  typeName: 'Int',
  hasInstance(anyValue: unknown): anyValue is IntType {
    return Number.isSafeInteger(anyValue);
  },
  codecSchema: () => ({
    type: 'integer',
  }),
});
