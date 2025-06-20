import { Tag } from '@w5s/core/dist/Tag.js';

export type FiberId = number & Tag<'FiberId'>;

export const FiberId = Tag.define<number, FiberId>({
  typeName: 'FiberId',
  hasInstance: (value) => typeof value === 'number',
});
