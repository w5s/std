import { Symbol } from '@w5s/core/Symbol';
import { Tag } from '@w5s/core/Tag';

/**
 * Represent a duration in milliseconds
 */
export type TimeDuration = number & Tag<'TimeDuration'>;

export const TimeDuration = Tag.define<number, TimeDuration>({
  typeName: 'TimeDuration',
  hasInstance(anyValue: unknown): anyValue is TimeDuration {
    return typeof anyValue === 'number' && !globalThis.Number.isNaN(anyValue);
  },
  [Symbol.schema]: () => ({ type: 'number' }),
});
