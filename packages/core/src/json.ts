import type { TypeError, SyntaxError } from '@w5s/error';
import type { Result } from './result.js';

const NativeJSON = globalThis.JSON;
const Ok = <V>(value: V): Result<V, never> => ({
  _: 'Ok',
  ok: true,
  value,
});
const Err = <E>(error: E): Result<never, E> => ({
  _: 'Error',
  ok: false,
  error,
});

/**
 * Any valid JSON value
 */
export type JSONValue =
  | null
  | boolean
  | number
  | string
  | Array<JSONValue>
  | {
      [key: string]: JSONValue;
    };

/**
 * A collection of functions to encode/decode JSON. Instead of throwing errors like `globalThis.JSON`, functions returns `Result`
 *
 * @example
 * ```typescript
 * import { JSON } from '@w5s/core';
 *
 * const object = { a: true };
 * const encoded = JSON.stringify(object); // Result.Ok('{"a":true}')
 * if (Result.isOk(encoded)) {
 *   const decoded = JSON.parse(encoded); // Result.Ok({ a: true })
 * }
 * ```
 *
 * @namespace
 */
export const JSON = {
  /**
   * Parse using `JSON.parse()` and return a `Result`.
   *
   * @example
   * ```typescript
   * const valid = '{ "a": true }';
   * JSON.parse(valid); // Result.Ok({ a: true })
   *
   * const invalid = '{ "a": }';
   * JSON.parse(invalid); // Result.Error(new SyntaxError('Unexpected token } in JSON at position 7'))
   * ```
   * @param anyString - the string to parse
   */
  parse(anyString: string): Result<JSONValue, SyntaxError> {
    try {
      return Ok(NativeJSON.parse(anyString));
    } catch (error: unknown) {
      return Err(error as SyntaxError);
    }
  },

  /**
   * Convert to string using `JSON.stringify()` and return a `Result`
   *
   * @example
   * ```typescript
   * const valid = { a: true };
   * JSON.stringify(valid); // Result.Ok('{"a":true}')
   *
   * const circular = {
   *   get ref() {
   *     return this;
   *   },
   * };
   * JSON.stringify(circular);// Result.Error(new TypeError(...));
   * ```
   * @param anyValue - the value to convert
   */
  stringify(anyValue: unknown): Result<string, TypeError> {
    try {
      return Ok(NativeJSON.stringify(anyValue));
    } catch (error: unknown) {
      return Err(error as TypeError);
    }
  },
};
