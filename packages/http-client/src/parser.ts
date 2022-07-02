import type { JSONValue, Task } from '@w5s/core';
import { HTTPClient } from './client.js';

function tryCall<V>(fn: () => Promise<V>): Task<V, HTTPClient.ParserError> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    taskRun: async (resolve, reject) => {
      try {
        resolve(await fn());
      } catch (error: unknown) {
        reject(
          HTTPClient.ParserError({
            cause: error,
          })
        );
      }
    },
  };
}

export function parseArrayBuffer(response: HTTPClient.Response) {
  return tryCall<ArrayBuffer>(() => response.arrayBuffer());
}

export function parseJSON<Return extends JSONValue>(_decode: 'unsafe') {
  return (response: HTTPClient.Response): Task<Return, HTTPClient.ParserError> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    tryCall(() => response.json());
}

export function parseBlob(response: HTTPClient.Response): Task<Blob, HTTPClient.ParserError> {
  return tryCall(() => response.blob());
}

export function parseText(response: HTTPClient.Response): Task<string, HTTPClient.ParserError> {
  return tryCall(() => response.text());
}

export function parseFormData(response: HTTPClient.Response): Task<FormData, HTTPClient.ParserError> {
  return tryCall(() => response.formData());
}
