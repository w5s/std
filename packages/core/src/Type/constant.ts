import type { JSONPrimitive, Primitive } from '@w5s/core-type';
import type { Type } from '../Type.js';
import { define } from './define.js';

/**
 * A type for constant `value`. An encoded value can be specified as second argument.
 *
 * @example
 * ```ts
 * const constantType = Type.constant('_'); // Encoded and decoded value are '_'
 * ```
 * @example
 * ```ts
 * const someSymbol = Symbol('someSymbol');
 * const someSymbolType = Type.constant(someSymbol, '__someSymbol__'); // Encoded value is '__someSymbol__'
 * ```
 * @param value - the decoded constant value
 * @param encodedValue - the encoded value (required only for non JSON representable values)
 */
export function constant<const Value extends string | number | boolean | null>(
  value: Value,
  encodedValue?: JSONPrimitive
): Type.Module<Value>;
export function constant<const Value extends bigint | symbol | undefined>(
  value: Value,
  encodedValue: JSONPrimitive
): Type.Module<Value>;
export function constant<const Value extends Primitive>(
  value: Value,
  encodedValue?: JSONPrimitive
): Type.Module<Value> {
  const typeName = String(value);
  const resolvedEncodedValue = (encodedValue === undefined ? value : encodedValue) as unknown as JSONPrimitive;
  return define({
    typeName,
    hasInstance: (anyValue): boolean => anyValue === value,
    codecSchema:
      resolvedEncodedValue === null
        ? () => ({
            type: 'null',
          })
        : () => ({
            const: resolvedEncodedValue,
          }),
    codecEncode: () => resolvedEncodedValue,
    codecDecode: (input, { ok, error }) => (input === resolvedEncodedValue ? ok(value) : error(input, typeName)),
  });
}
