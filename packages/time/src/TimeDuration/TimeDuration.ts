import { Symbol } from '@w5s/core/dist/Symbol.js';
import { Tag } from '@w5s/core/dist/Tag.js';

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
