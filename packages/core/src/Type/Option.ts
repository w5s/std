import type { Option as OptionType } from '../Option.js';
import type { Type } from '../Type.js';

import { decode } from '../Codec/decode.js';
import { encode } from '../Codec/encode.js';
import { schema } from '../Codec/schema.js';
import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * Return a new optional type from `Value`
 *
 * @example
 * const OptionString = Type.Option(Type.String);
 *
 * @param Value the value type
 */
export function Option<T>(Value: Type.Module<T>): Type.Module<OptionType<T>> {
  return define({
    hasInstance: (anyValue): anyValue is OptionType<T> => anyValue === undefined || Value.hasInstance(anyValue),
    [Symbol.decode]: (input, { ok }) => (input == null ? ok(undefined) : decode(Value, input)),
    [Symbol.encode]: (input) => (input == null ? null : encode(Value, input)),
    [Symbol.schema]: () => schema(Value),
    typeName: `Option<${Value.typeName}>`,
  });
}
