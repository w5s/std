import { encode } from '../Codec/encode.js';
import { decode } from '../Codec/decode.js';
import { schema } from '../Codec/schema.js';
import type { Option as OptionType } from '../Option.js';
import type { Type } from '../Type.js';
import { define } from './define.js';

/**
 * Return a new optional type from `Value`
 *
 * @example
 * const OptionString = Type.Option(Type.String);
 *
 * @param Value - the value type
 */
export function Option<T>(Value: Type.Module<T>): Type.Module<OptionType<T>> {
  return define({
    typeName: `Option<${Value.typeName}>`,
    hasInstance: (anyValue): anyValue is OptionType<T> => anyValue === undefined || Value.hasInstance(anyValue),
    codecEncode: (input) => (input == null ? null : encode(Value, input)),
    codecDecode: (input, { ok }) => (input == null ? ok(undefined) : decode(Value, input)),
    codecSchema: () => schema(Value),
  });
}
