import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { timeout as taskTimeout } from '@w5s/task-timeout';
import { andThen as taskThen } from '@w5s/task/dist/Task/andThen.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { Request } from './Request.js';
import { Client } from './Client.js';
import type { BodyReader } from './BodyReader.js';
import { from as responseFrom } from './Response/from.js';

/**
 * Return a new {@link @w5s/task!Task} that will send an HTTP request
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
  const { onRequest, onResponse } = client;
  const requestWrapped = onRequest(requestObject);
  const response = taskThen(requestWrapped, (request) => requestSendImplementation(client, request));
  const responseTimeout = taskTimeout(response, Client.getRequestTimeoutDuration(client, requestObject));
  return taskThen(responseTimeout, onResponse);
}

function requestSendImplementation(client: Client, requestObject: Request): Task<Response<BodyReader>, HTTPError> {
  const { fetch: fetchFn } = client;

  return taskFrom(async ({ resolve, reject, canceler }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { url, body, window: _window, ...requestInfo } = requestObject;
    const controller = new AbortController();
    canceler.current = () => {
      controller.abort();
    };

    if (isValidURL(url)) {
      let sent = false;
      try {
        const originalResponse = await fetchFn(url, {
          signal: controller.signal,
          ...requestInfo,
          body: body ?? null,
        });
        sent = true;
        resolve(responseFrom(originalResponse));
      } catch (networkError: unknown) {
        if (sent) {
          throw networkError;
        } else {
          reject(new HTTPError.NetworkError({ cause: networkError }));
        }
      }
    } else {
      await Promise.resolve();
      reject(
        new HTTPError.InvalidURL({
          message: 'Invalid URL',
          input: url,
        }),
      );
    }
  });
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
