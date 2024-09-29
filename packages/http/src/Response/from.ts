import type { Int } from '@w5s/core';
import type { Response } from '../Response.js';
import type { Status } from '../Status.js';
import type { BodyReader } from '../BodyReader.js';
import type { Headers } from '../Headers.js';

/**
 * Returns a new {@link Response} object from {@link globalThis.Response}
 *
 * @example
 * @param originalResponse
 */
export function from(originalResponse: globalThis.Response): Response<BodyReader> {
  return {
    headers: responseHeaders(originalResponse),
    ok: originalResponse.ok,
    status: responseStatus(originalResponse),
    type: originalResponse.type,
    url: originalResponse.url,
    redirected: originalResponse.redirected,
    body: responseBodyReader(originalResponse),
  };
}

function responseStatus(response: globalThis.Response): Status {
  return {
    statusCode: response.status as Int,
    statusMessage: response.statusText,
  };
}

function responseHeaders(response: globalThis.Response): Headers {
  const returnValue: Record<string, string> = {};

  response.headers.forEach((value, key) => {
    returnValue[key] = value;
  });

  return returnValue;
}

function responseBodyReader(response: globalThis.Response): BodyReader {
  return {
    arrayBuffer: () => response.arrayBuffer(),
    blob: () => response.blob(),
    formData: () => response.formData(),
    json: () => response.json(),
    stream: () => response.body ?? undefined,
    text: () => response.text(),
  };
}
