import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { timeout } from '@w5s/task-timeout';
import { andThen } from '@w5s/task/dist/Task/andThen.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { Request } from './Request.js';
import { Client } from './Client.js';
import type { BodyReader } from './BodyReader.js';
import type { Status } from './Status.js';
import type { Headers } from './Headers.js';

/**
 * Return a new {@link @w5s/core!Task} that will send an HTTP request
 *
 * @example
 * ```typescript
 * const responseTask = requestSend({
 *   url: 'http://someurl.com',
 * });
 * ```
 * @param client - Client
 * @param requestObject - the request parameters
 */
export function requestSend(client: Client, requestObject: Request): Task<Response<BodyReader>, HTTPError> {
  const { onRequest } = client;
  const requestWrapped = onRequest(requestObject);
  const response = andThen(requestWrapped, (request) => requestSendImplementation(client, request));
  return timeout(response, Client.getRequestTimeoutDuration(client, requestObject));
}

function requestSendImplementation(client: Client, requestObject: Request): Task<Response<BodyReader>, HTTPError> {
  const { fetch: fetchFn } = client;
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return from(async ({ resolve, reject, canceler }) => {
    const { url, ...requestInfo } = requestObject;

    const controller = new AbortController();
    canceler.current = controller.abort.bind(controller);

    if (isValidURL(url)) {
      let sent = false;
      try {
        const originalResponse = await fetchFn(url, {
          signal: controller.signal,
          ...requestInfo,
        });
        sent = true;
        resolve(toResponse(originalResponse));
      } catch (networkError: unknown) {
        if (sent) {
          throw networkError;
        } else {
          reject(HTTPError.NetworkError({ cause: networkError }));
        }
      }
    } else {
      await Promise.resolve();
      reject(
        HTTPError.InvalidURL({
          message: 'Invalid URL',
          input: url,
        })
      );
    }
  });
}

function toResponse(originalResponse: globalThis.Response): Response<BodyReader> {
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
    statusCode: response.status,
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

function isValidURL(url: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new globalThis.URL(url);
    return true;
  } catch {
    return false;
  }
}
