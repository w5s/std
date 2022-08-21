import type { JSONValue, Task } from '@w5s/core';
import { HTTPClient } from './client.js';
import { HTTPClientError } from './error.js';

function tryCall<V>(fn: () => Promise<V>): Task<V, HTTPClientError.ParserError> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    taskRun: async (resolve, reject) => {
      try {
        resolve(await fn());
      } catch (error: unknown) {
        reject(
          HTTPClientError.ParserError({
            cause: error,
          })
        );
      }
    },
  };
}

export const parseArrayBuffer: HTTPClient.Parser<ArrayBuffer> = (response) => tryCall(() => response.arrayBuffer());

export function parseJSON<Return extends JSONValue>(_decode: 'unsafe'): HTTPClient.Parser<Return> {
  return (response) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    tryCall(() => response.json());
}

export const parseBlob: HTTPClient.Parser<Blob> = (response) => tryCall(() => response.blob());

export const parseText: HTTPClient.Parser<string> = (response) => tryCall(() => response.text());

export const parseFormData: HTTPClient.Parser<FormData> = (response) => tryCall(() => response.formData());
