import type { Codec, JSONValue } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { mapResult } from '@w5s/task/dist/Task/mapResult.js';
import { decode } from '@w5s/core/dist/Codec/decode.js';
import { mapError } from '@w5s/core/dist/Result/mapError.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { BodyReader } from './BodyReader.js';

/**
 * A transformation function taking an {@link Response} as input
 */
export interface ResponseParser<Value> {
  (response: Response<BodyReader>): Task<Value, HTTPError.ParserError>;
}
export namespace ResponseParser {
  function from<V>(fn: (response: Response<BodyReader>) => Promise<V>): ResponseParser<V> {
    return (response) =>
      taskFrom(async ({ resolve, reject }) => {
        try {
          resolve(await fn(response));
        } catch (error: unknown) {
          reject(
            HTTPError.ParserError({
              cause: error,
            }),
          );
        }
      });
  }

  /**
   * ArrayBuffer response parser
   *
   * @example
   * ```typescript
   * const request = requestSend({
   *   url: 'http://localhost',
   * });
   * const body = Task.andThen(request, ResponseParser.arrayBuffer); // Task<ArrayBuffer, HTTPError>
   * ```
   */
  export const arrayBuffer: ResponseParser<ArrayBuffer> = from((response) => response.body.unsafeArrayBuffer());

  /**
   * FormData response parser
   *
   * @example
   * ```typescript
   * const request = requestSend({
   *   url: 'http://localhost',
   * });
   * const body = Task.andThen(request, ResponseParser.formData); // Task<FormData, HTTPError>
   * ```
   */
  export const formData: ResponseParser<FormData> = from((response) => response.body.unsafeFormData());

  /**
   * FormData response parser
   *
   * @example
   * ```typescript
   * type MyData = { foo: string, bar: boolean };
   *
   * const request = requestSend({
   *   url: 'http://localhost',
   * });
   * const body = Task.andThen(request, HTTPParser.json<MyData>('unsafe')); // Task<MyData, HTTPError>
   * ```
   */
  export function json<Return extends JSONValue>(CodecModule: 'unsafe' | Codec<Return>): ResponseParser<Return> {
    const parser = from<Return>((response) => response.body.unsafeJSON() as Promise<Return>);
    return CodecModule === 'unsafe'
      ? parser
      : (response) =>
          mapResult(parser(response), (result) =>
            result.ok
              ? mapError(decode(CodecModule, result.value), (error) => HTTPError.ParserError({ cause: error }))
              : result,
          );
  }

  /**
   * Blob response parser
   *
   * @example
   * ```typescript
   * const request = requestSend({
   *   url: 'http://localhost',
   * });
   * const body = Task.andThen(request, HTTPParser.blob); // Task<Blob, HTTPError>
   * ```
   */
  export const blob: ResponseParser<Blob> = from((response) => response.body.unsafeBlob());

  /**
   * Text response parser
   *
   * @example
   * ```typescript
   * const request = requestSend({
   *   url: 'http://localhost',
   * });
   * const body = Task.andThen(request, HTTPParser.text); // Task<string, HTTPError>
   * ```
   */
  export const text: ResponseParser<string> = from((response) => response.body.unsafeText());
}
