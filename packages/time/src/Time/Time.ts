import { Symbol } from '@w5s/core/dist/Symbol.js';
import { Tag } from '@w5s/core/dist/Tag.js';

import { parse } from './parse.js';

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = number & Tag<'Time'>;

export const Time = Tag.define<number, Time>({
  hasInstance(anyValue) {
    return typeof anyValue === 'number' && anyValue >= -8.64e15 && anyValue <= 8.64e15;
  },
  [Symbol.decode]: (input, { error, ok }) => {
    const timestamp = typeof input === 'string' ? parse(input) : undefined;
    return timestamp == null ? error(input, 'Time') : ok(timestamp);
  },
  [Symbol.encode]: (input) => new Date(input).toISOString(),
  [Symbol.schema]: () => ({ format: 'date-time', type: 'string' }),
  typeName: 'Time',
});
