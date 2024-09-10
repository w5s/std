import type { Codec, JSONValue } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { mapResult } from '@w5s/task/dist/Task/mapResult.js';
import { decode } from '@w5s/core/dist/Codec/decode.js';
import { mapError } from '@w5s/core/dist/Result/mapError.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';

/**
 * A transformation function taking an {@link Response} as input
 */
export interface HTTPParser<Value> {
  (response: Response): Task<Value, HTTPError.ParserError>;
}
export namespace HTTPParser {
  function from<V>(fn: (response: Response) => Promise<V>): HTTPParser<V> {
    return (response) =>
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      taskFrom(async ({ resolve, reject }) => {
        try {
          resolve(await fn(response));
        } catch (error: unknown) {
          reject(
            HTTPError.ParserError({
              cause: error,
            })
          );
        }
      });
  }

  /**
   * ArrayBuffer response parser
   *
   * @example
   * ```ts
   * const request = HTTP.request({
   *   url: 'http://localhost',
   *   parse: HTTPParser.arrayBuffer,
   * });// Task<ArrayBuffer, HTTPError>
   * ```
   */
  export const arrayBuffer: HTTPParser<ArrayBuffer> = from((response) => response.arrayBuffer());

  /**
   * FormData response parser
   *
   * @example
   * ```ts
   * const request = HTTP.request({
   *   url: 'http://localhost',
   *   parse: HTTPParser.formData,
   * });// Task<FormData, HTTPError>
   * ```
   */
  export const formData: HTTPParser<FormData> = from((response) => response.formData());

  /**
   * FormData response parser
   *
   * @example
   * ```ts
   * type MyData = { foo: string, bar: boolean };
   *
   * const request = HTTP.request({
   *   url: 'http://localhost',
   *   parse: HTTPParser.json<MyData>('unsafe'),
   * });// Task<MyData, HTTPError>
   * ```
   */
  export function json<Return extends JSONValue>(CodecModule: 'unsafe' | Codec<Return>): HTTPParser<Return> {
    const parser = from<Return>((response) => response.json());
    return CodecModule === 'unsafe'
      ? parser
      : (response) =>
          mapResult(parser(response), (result) =>
            result.ok
              ? mapError(decode(CodecModule, result.value), (error) => HTTPError.ParserError({ cause: error }))
              : result
          );
  }

  /**
   * Blob response parser
   *
   * @example
   * ```ts
   * const request = HTTP.request({
   *   url: 'http://localhost',
   *   parse: HTTPParser.blob,
   * });// Task<Blob, HTTPError>
   * ```
   */
  export const blob: HTTPParser<Blob> = from((response) => response.blob());

  /**
   * Text response parser
   *
   * @example
   * ```ts
   * const request = HTTP.request({
   *   url: 'http://localhost',
   *   parse: HTTPParser.text,
   * });// Task<string, HTTPError>
   * ```
   */
  export const text: HTTPParser<string> = from((response) => response.text());
}
