import { Symbol } from '@w5s/core/Symbol';
import { Tag } from '@w5s/core/Tag';
import { Int } from '@w5s/core/Type/Int';
import { format } from './format.js';
import { parse } from './parse.js';
import { defaultFormat } from './defaultFormat.js';

const formatOptions = { standard: defaultFormat };

/**
 * A file size in bytes
 */
export type ByteSize = number & Tag<'ByteSize'>;

/**
 * @namespace
 */
export const ByteSize = Tag.define<number, ByteSize>({
  typeName: 'ByteSize' as const,
  hasInstance: Int.hasInstance,
  [Symbol.encode]: (value) => format(value, formatOptions),
  [Symbol.decode]: (input, { ok, error }) => {
    const size = typeof input === 'string' ? parse(input) : undefined;
    return size == null ? error(input, 'ByteSize') : ok(size);
  },
  [Symbol.schema]: () => ({
    type: 'string',
    format: 'byte-size',
  }),
});
