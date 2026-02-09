import { Symbol } from '@w5s/core/dist/Symbol.js';
import { Tag } from '@w5s/core/dist/Tag.js';
import { Int } from '@w5s/core/dist/Type/Int.js';
import { format } from './format.js';
import { parse } from './parse.js';
import { defaultStandard } from './defaultStandard.js';

const formatOptions = { standard: defaultStandard };

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
