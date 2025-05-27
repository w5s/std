import { Tag } from '@w5s/core/dist/Tag.js';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { Codec } from '@w5s/core';
import { parse } from './parse.js';

const TimeCodec: Codec<Time> = {
  [Symbol.encode]: (input) => new Date(input).toISOString(),
  [Symbol.decode]: (input, { ok, error }) => {
    const timestamp = typeof input === 'string' ? parse(input) : undefined;
    return timestamp == null ? error(input, 'Time') : ok(timestamp);
  },
  [Symbol.schema]: () => ({ type: 'string', format: 'date-time' }),
};

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = number & Tag<'Time'>;

export const Time = Tag.define<number, Time>({
  typeName: 'Time',
  hasInstance(anyValue) {
    return typeof anyValue === 'number' && anyValue >= -8.64e15 && anyValue <= 8.64e15;
  },
  ...TimeCodec,
});
