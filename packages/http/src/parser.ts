import type { JSONValue, Task } from '@w5s/core';
import { HTTP } from './client.js';
import { HTTPError } from './error.js';

export interface HTTPParser<Value> {
  (response: HTTP.Response): Task<Value, HTTPError.ParserError>;
}
export namespace HTTPParser {
  function from<V>(fn: (response: HTTP.Response) => Promise<V>): HTTPParser<V> {
    return (response) => ({
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      taskRun: async (resolve, reject) => {
        try {
          resolve(await fn(response));
        } catch (error: unknown) {
          reject(
            HTTPError.ParserError({
              cause: error,
            })
          );
        }
      },
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
  export function json<Return extends JSONValue>(_decode: 'unsafe'): HTTPParser<Return> {
    return from<Return>((response) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      response.json()
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
