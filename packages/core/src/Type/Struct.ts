/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Codec } from '../Codec.js';
import type { JSONValue } from '../JSON.js';
import { isOk } from '../Result/isOk.js';
import type { Type } from '../Type.js';
import { define } from './define.js';

/**
 * Returns a codec for `P`.
 *
 * @example
 * ```typescript
 * const codec = Type.Struct({ created: dateISO });
 * const encoded = Codec.encode(codec, { created: new Date('1970-01-01T00:00:00.000Z') });// { created: '1970-01-01T00:00:00.000Z' }
 * const decoded = Codec.decode(codec, { created: '1970-01-01T00:00:00.000Z' });// Result.Ok({ created: Date('1970-01-01T00:00:00.000Z') })
 * ```
 * @param Properties - the codec for each array item
 */
export function Struct<P>(Properties: {
  readonly [K in keyof P]: Type.Module<P[K]>;
}): Type.Module<Readonly<P>>;
export function Struct(Properties: Record<string, Type.Module<unknown>>): Type.Module<Record<string, unknown>> {
  const propertyNames = globalThis.Object.keys(Properties);
  const propertyNameCount = propertyNames.length;
  return define({
    typeName: 'Struct',
    hasInstance: (anyValue): anyValue is Record<string, unknown> => {
      if (typeof anyValue === 'object' && anyValue !== null) {
        for (let index = 0; index < propertyNameCount; index += 1) {
          const propertyName = propertyNames[index]!;
          if (!Properties[propertyName]!.hasInstance((anyValue as Record<string, unknown>)[propertyName])) {
            return false;
          }
        }
        return true;
      }
      return false;
    },
    codecEncode: (input) => {
      const returnValue: Record<string, unknown> = {};

      for (let index = 0; index < propertyNameCount; index += 1) {
        const propertyName = propertyNames[index]!;

        returnValue[propertyName] = Codec.encode(Properties[propertyName]!, input[propertyName]);
      }

      return returnValue;
    },
    codecDecode: (input, { ok, error }) => {
      if (input == null || typeof input !== 'object') {
        return error(`Cannot decode ${String(input)} as object`);
      }

      const returnValue: Record<string, unknown> = {};
      for (let index = 0; index < propertyNameCount; index += 1) {
        const propertyName = propertyNames[index]!;
        const decodeResult = Codec.decode(Properties[propertyName]!, (input as Record<string, unknown>)[propertyName]);
        if (!isOk(decodeResult)) {
          return decodeResult;
        }
        returnValue[propertyName] = decodeResult.value;
      }
      return ok(returnValue);
    },
    codecSchema: () =>
      propertyNames.reduce(
        (acc, propertyName) => {
          acc.properties[propertyName] = Codec.schema(Properties[propertyName]!);

          return acc;
        },
        {
          type: 'object',
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          properties: {} as Record<string, unknown>,
          required: [] as string[],
        }
      ) as JSONValue,
  });
}
