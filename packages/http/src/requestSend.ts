import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { timeout } from '@w5s/task-timeout';
import { andThen } from '@w5s/task/dist/Task/andThen.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { Request } from './Request.js';
import { Client } from './Client.js';

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
export function requestSend(client: Client, requestObject: Request): Task<Response, HTTPError> {
  const { onRequest } = client;
  const requestWrapped = onRequest(requestObject);
  const response = andThen(requestWrapped, (request) => requestSendImplementation(client, request));
  const timeoutDuration = Client.getRequestTimeoutDuration(client, requestObject);
  const responseWithTimeout = timeoutDuration == null ? response : timeout(response, timeoutDuration);
  return responseWithTimeout;
}

function requestSendImplementation(client: Client, requestObject: Request): Task<Response, HTTPError> {
  const { fetch: fetchFn } = client;
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return from(async ({ resolve, reject, canceler }) => {
    const { url, ...requestInfo } = requestObject;

    const controller = new AbortController();
    canceler.current = controller.abort.bind(controller);

    if (isValidURL(url)) {
      try {
        const originalResponse = await fetchFn(url, {
          signal: controller.signal,
          ...requestInfo,
        });
        const response = toResponse(originalResponse);

        resolve(response);
      } catch (networkError: unknown) {
        reject(HTTPError.NetworkError({ cause: networkError }));
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

function toResponse(originalResponse: globalThis.Response): Response {
  return originalResponse;
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
