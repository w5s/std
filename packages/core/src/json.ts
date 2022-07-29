import type { Result } from './result.js';

export type JSONValue =
  | null
  | boolean
  | number
  | string
  | Array<JSONValue>
  | {
      [key: string]: JSONValue;
    };

export namespace JSON {
  const NativeJSON = globalThis.JSON;
  const resultOk = <V>(value: V): Result<V, never> => ({
    _type: 'Result/Ok',
    value,
  });
  const resultError = <E>(error: E): Result<never, E> => ({
    _type: 'Result/Error',
    error,
  });

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
  export function parse(anyString: string): Result<JSONValue, SyntaxError> {
    try {
      return resultOk(NativeJSON.parse(anyString));
    } catch (error: unknown) {
      return resultError(error as SyntaxError);
    }
  }

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
  export function stringify(anyValue: unknown): Result<string, TypeError> {
    try {
      return resultOk(NativeJSON.stringify(anyValue));
    } catch (error: unknown) {
      return resultError(error as TypeError);
    }
  }
}
