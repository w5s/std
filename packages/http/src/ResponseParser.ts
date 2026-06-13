import type { JSONValue } from '@w5s/core/JSON';
import type { Codec } from '@w5s/core/Codec';
import type { Task } from '@w5s/task/Task';
import { from as taskFrom } from '@w5s/task/Task/from';
import { mapResult } from '@w5s/task/Task/mapResult';
import { decode } from '@w5s/core/Codec/decode';
import { mapError } from '@w5s/core/Result/mapError';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { BodyReader } from './BodyReader.js';

function from<V>(fn: (response: Response<BodyReader>) => Promise<V>): ResponseParser<V> {
  return (response) =>
    taskFrom(async ({ resolve, reject }) => {
      try {
        resolve(await fn(response));
      } catch (error: unknown) {
        reject(
          new HTTPError.ParserError({
            cause: error,
          }),
        );
      }
    });
}

/**
 * A transformation function taking an {@link Response} as input
 */
export interface ResponseParser<Value> {
  (response: Response<BodyReader>): Task<Value, HTTPError.ParserError>;
}

/**
 * @namespace
 */
export const ResponseParser = {
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
  arrayBuffer: from<ArrayBuffer>((response) => response.body.unsafeArrayBuffer()),

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
  formData: from<FormData>((response) => response.body.unsafeFormData()),

  /**
   * FormData response parser
   *
   * @param CodecModule
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
  json<Return extends JSONValue>(CodecModule: 'unsafe' | Codec<Return>): ResponseParser<Return> {
    const parser = from<Return>((response) => response.body.unsafeJSON() as Promise<Return>);
    return CodecModule === 'unsafe'
      ? parser
      : (response) =>
          mapResult(parser(response), (result) =>
            result.ok
              ? mapError(decode(CodecModule, result.value), (error) => new HTTPError.ParserError({ cause: error }))
              : result,
          );
  },

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
  blob: from<Blob>((response) => response.body.unsafeBlob()),

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
  text: from<string>((response) => response.body.unsafeText()),
};
