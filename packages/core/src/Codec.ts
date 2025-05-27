import type { Result } from './Result.js';
import type { JSONValue } from './JSON.js';
import { CodecError } from './CodecError.js';
import { decode } from './Codec/decode.js';
import { encode } from './Codec/encode.js';
import { lazy } from './Codec/lazy.js';
import { schema } from './Codec/schema.js';
import { Symbol } from './Symbol.js';

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
  [Symbol.decode](this: void, input: unknown, context: Codec.Context<T>): Result<T, CodecError>;
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
  [Symbol.encode](this: void, input: T): unknown;
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
  [Symbol.schema](this: void): JSONValue;
}

/**
 * @namespace
 */
export const Codec = {
  decode,
  encode,
  lazy,
  schema,
};
export namespace Codec {
  export type TypeOf<V> = V extends Codec<infer Type> ? Type : never;

  export interface Context<T> {
    /**
     * Helper that returns a new Ok result
     *
     * @param value
     */
    ok: (value: T) => Result<T, CodecError>;
    /**
     * Helper that returns a new Error result
     *
     * @param message
     */
    error: (input: unknown, asType?: string) => Result<T, CodecError>;
  }
}
