import type { Codec } from '@w5s/core';
import { Tag } from '@w5s/core/dist/Tag.js';
import { parse } from './parse.js';

const TimeCodec: Codec<Time> = {
  codecEncode: (input) => new Date(input).toISOString(),
  codecDecode: (input, { ok, error }) => {
    const timestamp = typeof input === 'string' ? parse(input) : undefined;
    return timestamp == null ? error(input, 'Time') : ok(timestamp);
  },
  codecSchema: () => ({ type: 'string', format: 'date-time' }),
};

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = number & Tag<'Time'>;

export const Time = Tag.define<number, Time>({
  typeName: 'Time',
  hasInstance(anyValue) {
    return typeof anyValue === 'number' && !Number.isNaN(anyValue) && anyValue >= -8.64e15 && anyValue <= 8.64e15;
  },
  ...TimeCodec,
});
