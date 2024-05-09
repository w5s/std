import { Tag } from '@w5s/core/dist/Tag.js';

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = number & Tag<'Time'>;

export const Time = Tag.define<number, Time>({
  typeName: 'Time',
  hasInstance(anyValue) {
    return typeof anyValue === 'number' && anyValue >= 0 && !Number.isNaN(anyValue);
  },
  codecSchema: () => ({ type: 'number' }),
});
