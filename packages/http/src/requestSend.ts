import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { timeout } from '@w5s/task-timeout';
import type { TimeDuration } from '@w5s/time';
import type { Option } from '@w5s/core';
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
  const task = requestSendImplementation(client, requestObject);
  const timeoutDuration = requestTimeoutDuration(client, requestObject);
  return timeoutDuration == null ? task : timeout(task, timeoutDuration);
}

function requestTimeoutDuration(client: Client, requestObject: Request): Option<TimeDuration> {
  const { timeout: requestTimeout = 'default' } = requestObject;
  return requestTimeout === 'none'
    ? undefined
    : requestTimeout === 'default'
      ? Client.getTimeoutDuration(client)
      : requestTimeout;
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
        const response = await fetchFn(url, {
          signal: controller.signal,
          ...requestInfo,
        });

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

function isValidURL(url: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new globalThis.URL(url);
    return true;
  } catch {
    return false;
  }
}
