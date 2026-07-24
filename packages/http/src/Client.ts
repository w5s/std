import type { Option } from '@w5s/core';
import type { TaskLike } from '@w5s/task';
import type { TimeDuration } from '@w5s/time';

import { invariant } from '@w5s/error/dist/invariant.js';
import { resolve } from '@w5s/task/dist/Task/resolve.js';

import type { BodyReader } from './BodyReader.js';
import type { HTTPError } from './HTTPError.js';
import type { Request } from './Request.js';
import type { RequestTimeout } from './RequestTimeout.js';
import type { Response } from './Response.js';

export interface Client {
  /**
   * Fetch function. Default to `globalThis.fetch`.
   */
  fetch: typeof globalThis.fetch;

  /**
   * Wrap a request before sent
   *
   * @param request the request to wrap
   */
  onRequest: (request: Request) => TaskLike<Request, HTTPError>;

  /**
   * Wrap a received response
   *
   * @param response the response to wrap
   */
  onResponse: (response: Response<BodyReader>) => TaskLike<Response<BodyReader>, HTTPError>;

  /**
   * Response timeout setting
   */
  timeout: RequestTimeout;
}

/**
 *
 * @namespace
 */
export const Client = Object.assign(
  (parameters: Client.Options = {}): Client => {
    const { fetch = getDefaultFetch(), onRequest = resolve, onResponse = resolve, timeout = 'default' } = parameters;
    return {
      fetch,
      onRequest,
      onResponse,
      timeout,
    };
  },
  {
    /**
     * Default timeout duration in milliseconds for client
     */
    defaultTimeoutDuration: (30 * 1000) as TimeDuration, // 30 seconds

    /**
     * Returns the timeout duration in milliseconds for the request and client
     *
     * @example
     * ```typescript
     * const client = Client();
     * const duration = Client.getRequestTimeoutDuration(client);
     * ```
     * @param client
     * @param requestObject
     */
    getRequestTimeoutDuration(client: Client, requestObject: Request): Option<TimeDuration> {
      const { timeout: requestTimeout = 'default' } = requestObject;
      return requestTimeout === 'none'
        ? undefined
        : requestTimeout === 'default'
          ? Client.getTimeoutDuration(client)
          : requestTimeout;
    },

    /**
     * Returns the timeout duration in milliseconds for client
     *
     * @example
     * ```typescript
     * const client = Client();
     * const duration = Client.getTimeoutDuration(client);
     * ```
     * @param client
     */
    getTimeoutDuration(client: Client): Option<TimeDuration> {
      const { timeout } = client;
      return timeout === 'none' ? undefined : timeout === 'default' ? Client.defaultTimeoutDuration : timeout;
    },
  },
);

export namespace Client {
  export interface Options extends Partial<Client> {}
}

function getDefaultFetch() {
  invariant(globalThis.fetch != null, 'globalThis.fetch is not defined');
  return globalThis.fetch;
}
