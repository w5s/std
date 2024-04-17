import { CustomError } from '@w5s/error';
import type { Array } from './Array.js';
import type { Option } from './Option.js';
import type { Result } from './Result.js';
import type { JSONValue } from './JSON.js';
import type { Int } from './Int.js';

const Ok = <V>(value: V): Result<V, never> => ({ _: 'Ok', ok: true, value });
const Err = <E>(error: E): Result<never, E> => ({ _: 'Error', ok: false, error });
const isOk = <V>(result: Result<V, unknown>): result is Result.Ok<V> => result.ok;
const identity = <V>(_: V) => _;
const emptySchema = () => ({});

export interface DecodeError
  extends CustomError<{
    name: 'DecodeError';
    input: unknown;
  }> {}
/**
 * Decode Error constructor
 *
 * @category Constructor
 */
export const DecodeError = CustomError.define<DecodeError>('DecodeError');

export interface Codec<T> {
  /**
   * Returns the decoded `input`, `Result.Ok` or `Result.Error()`
   *
   * @example
   * ```typescript
   * interface SomeObject {
   *   foo: string
   * }
   * const someCodec: Codec<SomeObject> = ...;
   * const input: unknown = ...;
   * const decoded = Codec.decode(someCodec, input);
   * ```
   * @category Codec
   * @param input - The value to decode
   */
  codecDecode(this: void, input: unknown): Result<T, DecodeError>;
  /**
   * Returns the encoded `input`
   *
   * @example
   * ```typescript
   * interface SomeObject {
   *   foo: string
   * }
   * const someCodec: Codec<SomeObject> = ...;
   * const someObject: SomeObject = { foo: "bar" }
   * const encoded = Codec.decode(someCodec, someObject);
   * ```
   * @category Codec
   * @param input - The value to encode
   */
  codecEncode(this: void, input: T): unknown;
  /**
   * Returns the JSONSchema corresponding to the decoded type
   *
   * @example
   * ```typescript
   * const someCodec: Codec<unknown> = ...;
   * const jsonSchema = Codec.schema(someCodec);
   * ```
   * @category Codec
   */
  codecSchema(this: void): JSONValue;
}

/**
 * Construct a new Codec from `parameters`
 *
 * @example
 * ```typescript
 * const hexCodec = Codec<Int>({
 *   codecDecode: (input) => {
 *     const value = parseInt(input, 16);
 *     return Number.isNaN(value) ?
 *       Result.Error(DecodeError('Value is not a valid hexadecimal')) :
 *       Result.Ok(value as Int);
 *   },
 *   codecEncode: (input) => input.toString(16),
 * });
 * ```
 * @category Constructor
 */
export function Codec<T>(parameters: {
  codecDecode: (input: unknown) => Result<T, DecodeError>;
  codecEncode: (input: T) => unknown;
  codecSchema?: () => JSONValue;
}): Codec<T> {
  return {
    codecDecode: parameters.codecDecode,
    codecEncode: parameters.codecEncode,
    codecSchema: parameters.codecSchema ?? emptySchema,
  };
}
export namespace Codec {
  export type TypeOf<V> = V extends Codec<infer Type> ? Type : never;

  /**
   * Returns a lazy evaluated codec. Useful for recursive structures.
   *
   * @example
   * ```typescript
   * interface Node {
   *   value: unknown,
   *   children: Node[]
   * }
   * const Node = object<Node>({
   *   content: string,
   *   responses: Codec.lazy(() => array(Node))
   * })
   * ```
   * @param getCodec - the accessor to the codec
   */
  export function lazy<T>(getCodec: () => Codec<T>): Codec<T> {
    let ref: Option<Codec<T>>;
    // eslint-disable-next-line no-return-assign
    const resolve = () => ref ?? (ref = getCodec());
    return Codec({
      codecDecode: (input) => Codec.decode(resolve(), input),
      codecEncode: (input) => Codec.encode(resolve(), input),
      codecSchema: () => Codec.schema(resolve()),
    });
  }

  /**
   * Returns the encoded `input`
   *
   * @example
   * ```typescript
   * const codec: Codec<Date> = dateISO;
   * const input = new Date('2022-07-31T14:04:48.449Z');
   * const encoded = Codec.encode(codec, input);// '2022-07-31T14:04:48.449Z'
   * ```
   * @param codec - the encoder module
   * @param input - the input to encode
   */
  export function encode<T>(codec: Pick<Codec<T>, 'codecEncode'>, input: T): unknown {
    return codec.codecEncode(input);
  }

  /**
   * Returns a `Result` containing the decoded `input`
   *
   * @example
   * ```typescript
   * const codec: Codec<Date> = dateISO;
   * const input = '2022-07-31T14:04:48.449Z';
   * const decoded = Codec.decode(codec, input);// Result.Ok('2022-07-31T14:04:48.449Z')
   * ```
   * @param codec - the decoder module
   * @param input - the input to encode
   */
  export function decode<T>(codec: Pick<Codec<T>, 'codecDecode'>, input: unknown): Result<T, DecodeError> {
    return codec.codecDecode(input);
  }

  /**
   * Returns the JSONSchema
   *
   * @example
   * ```typescript
   * Codec.schema(string);// { type: 'string' }
   * ```
   * @param codec - the codec module
   */
  export function schema<T>(codec: Pick<Codec<T>, 'codecSchema'>) {
    return codec.codecSchema();
  }
}

function typeError(anyValue: unknown, type: string) {
  return DecodeError({
    message: `${String(anyValue)} is not a valid ${type}`,
    input: anyValue,
  });
}

function primitive(type: 'boolean'): Codec<boolean>;
function primitive(type: 'number'): Codec<number>;
function primitive(type: 'string'): Codec<string>;
function primitive(type: 'boolean' | 'number' | 'string'): Codec<any> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Codec({
    codecEncode: identity,
    codecDecode: (input) => (typeof input === type ? Ok(input) : Err(typeError(input, type))),
    codecSchema: () => ({ type }),
  });
}

/**
 * Boolean codec
 *
 * @example
 * ```typescript
 * const encoded = Codec.encode(boolean, true); // true
 * const decoded = Codec.decode(boolean, true); // Result.Ok(true)
 * ```
 */
export const boolean = primitive('boolean');

/**
 * Number codec
 *
 * @example
 * ```typescript
 * const encoded = Codec.encode(number, 1); // 1
 * const decoded = Codec.decode(number, 1); // Result.Ok(1)
 * ```
 */
export const number = primitive('number');

/**
 * String codec
 *
 * @example
 * ```typescript
 * const encoded = Codec.encode(string, 'abc'); // 'abc'
 * const decoded = Codec.decode(string, 'abc'); // Result.Ok('abc')
 * ```
 */
export const string = primitive('string');

/**
 * Returns a codec for `Option<V>`.
 *
 * @example
 * ```typescript
 * const codec = option(string);
 * const encoded = Codec.encode(codec, undefined);// null
 * const decoded = Codec.decode(codec, null);// undefined
 * ```
 * @param codec - the codec to decorate
 */
export function option<V>(codec: Codec<V>): Codec<Option<V>> {
  return Codec({
    codecEncode: (input) => (input == null ? null : Codec.encode(codec, input)),
    codecDecode: (input) => (input == null ? Ok(undefined) : Codec.decode(codec, input)),
    codecSchema: () => Codec.schema(codec),
  });
}

/**
 * Returns a codec for `Array<V>`.
 *
 * @example
 * ```typescript
 * const codec = array(dateISO);
 * const encoded = Codec.encode(codec, [new Date('1970-01-01T00:00:00.000Z')]);// ['1970-01-01T00:00:00.000Z']
 * const decoded = Codec.decode(codec, ['1970-01-01T00:00:00.000Z']);// Result.Ok([Date('1970-01-01T00:00:00.000Z')])
 * ```
 * @param itemCodec - the codec for each array item
 */
export function array<V>(itemCodec: Codec<V>): Codec<Array<V>> {
  return Codec({
    codecEncode: (input) => input.map(itemCodec.codecEncode),
    codecDecode: (input) => {
      if (!globalThis.Array.isArray(input)) {
        return Err(typeError(input, 'Array'));
      }

      const values = [];
      // eslint-disable-next-line unicorn/no-for-loop
      for (let index = 0; index < input.length; index += 1) {
        const result = Codec.decode(itemCodec, input[index]);
        if (!isOk(result)) {
          return result;
        }
        values.push(result.value);
      }
      return Ok(values);
    },
    codecSchema: () => ({ type: 'array', item: Codec.schema(itemCodec) }),
  });
}

/**
 * Returns a codec for `P`.
 *
 * @example
 * ```typescript
 * const codec = object({ created: dateISO });
 * const encoded = Codec.encode(codec, { created: new Date('1970-01-01T00:00:00.000Z') });// { created: '1970-01-01T00:00:00.000Z' }
 * const decoded = Codec.decode(codec, { created: '1970-01-01T00:00:00.000Z' });// Result.Ok({ created: Date('1970-01-01T00:00:00.000Z') })
 * ```
 * @param codecMap - the codec for each array item
 */
export function object<P>(codecMap: {
  readonly [K in keyof P]: Codec<P[K]>;
}): Codec<Readonly<P>>;
export function object(codecMap: Record<string, Codec<unknown>>): Codec<Record<string, unknown>> {
  const propertyNames = Object.keys(codecMap);
  const propertyNameCount = propertyNames.length;
  return Codec({
    codecEncode: (input) => {
      const returnValue: Record<string, unknown> = {};

      for (let index = 0; index < propertyNameCount; index += 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const propertyName = propertyNames[index]!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        returnValue[propertyName] = Codec.encode(codecMap[propertyName]!, input[propertyName]);
      }

      return returnValue;
    },
    codecDecode: (input) => {
      if (input == null || typeof input !== 'object') {
        return Err(typeError(input, 'object'));
      }

      const returnValue: Record<string, unknown> = {};
      for (let index = 0; index < propertyNameCount; index += 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const propertyName = propertyNames[index]!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const decodeResult = Codec.decode(codecMap[propertyName]!, (input as Record<string, unknown>)[propertyName]);
        if (!isOk(decodeResult)) {
          return decodeResult;
        }
        returnValue[propertyName] = decodeResult.value;
      }
      return Ok(returnValue);
    },
    codecSchema: () =>
      propertyNames.reduce(
        (acc, propertyName) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          acc.properties[propertyName] = Codec.schema(codecMap[propertyName]!);

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

/**
 * Integer codec
 *
 * @example
 * ```typescript
 * const encoded = Codec.encode(int, 1); // 1
 * const decoded = Codec.decode(int, 1); // Result.Ok(Int.of(1))
 * ```
 */
export const int: Codec<Int> = Codec({
  codecEncode: identity,
  codecDecode: (input) => (Number.isSafeInteger(input) ? Ok(input as Int) : Err(typeError(input, 'integer'))),
  codecSchema: () => ({ type: 'integer' }),
});

/**
 * Date codec. Values are encoded as ISO string
 *
 * @example
 * ```typescript
 * const encoded = Codec.encode(dateISO, new Date(0)); // '1970-01-01T00:00:00.000Z'
 * const decoded = Codec.decode(dateISO, '1970-01-01T00:00:00.000Z'); // Result.Ok(new Date('1970-01-01T00:00:00.000Z'))
 * ```
 */
export const dateISO: Codec<Date> = Codec({
  codecEncode: (input) => input.toISOString(),
  codecDecode: (input) => {
    const timeInput = Codec.decode(string, input);
    if (!isOk(timeInput)) {
      return timeInput;
    }
    const time = Date.parse(timeInput.value);
    return Number.isNaN(time) ? Err(typeError(input, 'Date')) : Ok(new Date(time));
  },
  codecSchema: () => ({ type: 'string', format: 'date-time' }),
});
