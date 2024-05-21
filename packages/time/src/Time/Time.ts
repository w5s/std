import { Tag } from '@w5s/core/dist/Tag.js';

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = number & Tag<'Time'>;

export const Time = Tag.define<number, Time>({
  typeName: 'Time',
  hasInstance(anyValue) {
    return typeof anyValue === 'number' && !Number.isNaN(anyValue) && anyValue >= -8.64e15 && anyValue <= 8.64e15;
  },
  codecSchema: () => ({ type: 'number' }),
});
