import { Tag } from '@w5s/core/dist/Tag.js';

export type Char = string & Tag<'Char'>;

export const Char = Tag.define<string, Char>({
  typeName: 'Char',
  hasInstance: (anyValue) => typeof anyValue === 'string' && anyValue.length === 1,
  codecSchema: () => ({
    type: 'string',
    minLength: 1,
    maxLength: 1,
  }),
});
