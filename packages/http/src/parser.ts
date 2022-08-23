import type { JSONValue, Task } from '@w5s/core';
import { HTTP } from './client.js';
import { HTTPError } from './error.js';

function tryCall<V>(fn: () => Promise<V>): Task<V, HTTPError.ParserError> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    taskRun: async (resolve, reject) => {
      try {
        resolve(await fn());
      } catch (error: unknown) {
        reject(
          HTTPError.ParserError({
            cause: error,
          })
        );
      }
    },
  };
}

export const parseArrayBuffer: HTTP.Parser<ArrayBuffer> = (response) => tryCall(() => response.arrayBuffer());

export function parseJSON<Return extends JSONValue>(_decode: 'unsafe'): HTTP.Parser<Return> {
  return (response) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    tryCall(() => response.json());
}

export const parseBlob: HTTP.Parser<Blob> = (response) => tryCall(() => response.blob());

export const parseText: HTTP.Parser<string> = (response) => tryCall(() => response.text());

export const parseFormData: HTTP.Parser<FormData> = (response) => tryCall(() => response.formData());
