import { Symbol } from '@w5s/core/dist/Symbol.js';
import { Tag } from '@w5s/core/dist/Tag.js';
import { Int } from '@w5s/core/dist/Type/Int.js';

import { defaultFormat } from './defaultFormat.js';
import { format } from './format.js';
import { parse } from './parse.js';

const formatOptions = { standard: defaultFormat };

/**
 * A file size in bytes
 */
export type ByteSize = number & Tag<'ByteSize'>;

/**
 * @namespace
 */
export const ByteSize = Tag.define<number, ByteSize>({
  hasInstance: Int.hasInstance,
  [Symbol.decode]: (input, { error, ok }) => {
    const size = typeof input === 'string' ? parse(input) : undefined;
    return size == null ? error(input, 'ByteSize') : ok(size);
  },
  [Symbol.encode]: (value) => format(value, formatOptions),
  [Symbol.schema]: () => ({
    format: 'byte-size',
    type: 'string',
  }),
  typeName: 'ByteSize' as const,
});
