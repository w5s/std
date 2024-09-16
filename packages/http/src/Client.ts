import { invariant } from '@w5s/invariant';
import type { Option } from '@w5s/core';
import type { TimeDuration } from '@w5s/time';
import type { TaskLike } from '@w5s/task';
import { resolve } from '@w5s/task/dist/Task/resolve.js';
import type { RequestTimeout } from './RequestTimeout.js';
import type { Request } from './Request.js';
import type { HTTPError } from './HTTPError.js';

export interface Client {
  /**
   * Wrap a request
   *
   * @param request - the request to wrap
   */
  onRequest: (request: Request) => TaskLike<Request, HTTPError>;
  /**
   * Fetch function. Default to `globalThis.fetch`.
   */
  fetch: typeof globalThis.fetch;
  /**
   * Response timeout setting
   */
  timeout: RequestTimeout;
}

export function Client(parameters: Client.Options = {}): Client {
  const { timeout = 'default', fetch = getDefaultFetch(), onRequest = resolve } = parameters;
  return {
    onRequest,
    fetch,
    timeout,
  };
}
export namespace Client {
  export interface Options extends Partial<Client> {}

  export const defaultTimeoutDuration = (30 * 1000) as TimeDuration; // 30 seconds

  /**
   * Returns the timeout duration in milliseconds for client
   *
   * @example
   * ```ts
   * const client = Client();
   * const duration = Client.getTimeoutDuration(client);
   * ```
   * @param client
   */
  export function getTimeoutDuration(client: Client): Option<TimeDuration> {
    const { timeout } = client;
    return timeout === 'none' ? undefined : timeout === 'default' ? defaultTimeoutDuration : timeout;
  }

  /**
   * Returns the timeout duration in milliseconds for the request and client
   *
   * @example
   * ```ts
   * const client = Client();
   * const duration = Client.getRequestTimeoutDuration(client);
   * ```
   * @param client
   */
  export function getRequestTimeoutDuration(client: Client, requestObject: Request): Option<TimeDuration> {
    const { timeout: requestTimeout = 'default' } = requestObject;
    return requestTimeout === 'none'
      ? undefined
      : requestTimeout === 'default'
        ? getTimeoutDuration(client)
        : requestTimeout;
  }
}

function getDefaultFetch() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  invariant(globalThis.fetch != null, 'globalThis.fetch is not defined');
  return globalThis.fetch;
}
