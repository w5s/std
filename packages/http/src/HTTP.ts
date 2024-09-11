import { invariant } from '@w5s/invariant';
import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { andThen } from '@w5s/task/dist/Task/andThen.js';
import { HTTPError } from './HTTPError.js';
import type { HTTPParser } from './HTTPParser.js';
import type { Response } from './Response.js';
import type { Request as RequestDefault } from './Request.js';

/**
 * Types
 */
type NativeFetch = typeof globalThis.fetch;

export namespace HTTP {
  /**
   * Return a new {@link @w5s/core!Task} that will send an HTTP request
   *
   * @example
   * ```typescript
   * const responseTask = HTTP.request({
   *   url: 'http://someurl.com',
   *   parse: parseText,
   * });
   * ```
   * @param requestObject - the request parameters
   */
  export function request<Value>(requestObject: request.Request<Value>): Task<Value, HTTPError> {
    const { parse, fetch: localFetch = getDefaultFetch(), ...fetchRequest } = requestObject;

    return andThen(applyFetch(localFetch, fetchRequest), parse);
  }
  export namespace request {
    export interface Request<Value> extends RequestDefault {
      /**
       * Response Parser
       */
      readonly parse: HTTPParser<Value>;
      /**
       * The optional fetch function
       */
      readonly fetch?: NativeFetch;
    }
  }
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

function getDefaultFetch() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  invariant(globalThis.fetch != null, 'globalThis.fetch is not defined');
  return globalThis.fetch;
}

function applyFetch(
  fetchFn: NativeFetch,
  request: RequestDefault
): Task<Response, HTTPError.InvalidURL | HTTPError.NetworkError> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return from(async ({ resolve, reject, canceler }) => {
    const { url, ...requestInfo } = request;

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
      reject(
        HTTPError.InvalidURL({
          message: 'Invalid URL',
          input: url,
        })
      );
    }
  });
}
