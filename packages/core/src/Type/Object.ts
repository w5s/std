/* eslint-disable ts/no-non-null-assertion */
import type { JSONValue } from '../JSON.js';
import type { Type } from '../Type.js';

import { decode } from '../Codec/decode.js';
import { encode } from '../Codec/encode.js';
import { schema } from '../Codec/schema.js';
import { isOk } from '../Result/isOk.js';
import { Symbol } from '../Symbol.js';
import { define } from './define.js';

/**
 * Returns a new Type for `P`.
 *
 * @example
 * ```typescript
 * const SomeType = Type.Object({ created: dateISO }, 'SomeType');
 * const encoded = Codec.encode(SomeType, { created: new Date('1970-01-01T00:00:00.000Z') });// { created: '1970-01-01T00:00:00.000Z' }
 * const decoded = Codec.decode(SomeType, { created: '1970-01-01T00:00:00.000Z' });// Result.Ok({ created: Date('1970-01-01T00:00:00.000Z') })
 * ```
 * @param Properties the codec for each array item
 * @param typeName
 */
export function TObject<P>(
  Properties: {
    readonly [K in keyof P]: Type.Module<P[K]>;
  },
  typeName?: string,
): Type.Module<Readonly<P>>;
export function TObject(
  Properties: Record<string, Type.Module<unknown>>,
  typeName?: string,
): Type.Module<Record<string, unknown>> {
  const propertyNames = globalThis.Object.keys(Properties);
  const propertyNameCount = propertyNames.length;
  return define({
    hasInstance: (anyValue: unknown): anyValue is Record<string, unknown> => {
      if (typeof anyValue === 'object' && anyValue !== null) {
        const recordValue = anyValue as Record<string, unknown>;
        for (let index = 0; index < propertyNameCount; index += 1) {
          const propertyName = propertyNames[index]!;
          if (!Properties[propertyName]!.hasInstance(recordValue[propertyName])) {
            return false;
          }
        }
        return true;
      }
      return false;
    },
    [Symbol.decode]: (input, { error, ok }) => {
      if (input == null || typeof input !== 'object') {
        return error(input, 'object');
      }

      const returnValue: Record<string, unknown> = {};
      for (let index = 0; index < propertyNameCount; index += 1) {
        const propertyName = propertyNames[index]!;
        const decodeResult = decode(Properties[propertyName]!, (input as Record<string, unknown>)[propertyName]);
        if (!isOk(decodeResult)) {
          return decodeResult;
        }
        returnValue[propertyName] = decodeResult.value;
      }
      return ok(returnValue);
    },
    [Symbol.encode]: (input) => {
      const returnValue: Record<string, unknown> = {};

      for (let index = 0; index < propertyNameCount; index += 1) {
        const propertyName = propertyNames[index]!;

        returnValue[propertyName] = encode(Properties[propertyName]!, input[propertyName]);
      }

      return returnValue;
    },
    [Symbol.schema]: () =>
      propertyNames.reduce(
        (acc: { properties: Record<string, unknown>; required: Array<string>; type: 'object' }, propertyName) => {
          acc.properties[propertyName] = schema(Properties[propertyName]!);

          return acc;
        },
        {
          properties: {},
          required: [] as Array<string>,
          type: 'object' as const,
        },
      ) as JSONValue,
    typeName: typeName ?? 'Object',
  });
}
