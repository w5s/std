import { invariant } from '@w5s/invariant';
import type { Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { andThen } from '@w5s/task/dist/Task/andThen.js';
import { HTTPError } from './HTTPError.js';
import type { HTTPParser } from './HTTPParser.js';
import type { Method } from './Method.js';
import type { RequestHeaders } from './RequestHeaders.js';
import type { Response } from './Response.js';
import type { RequestCredentials } from './RequestCredentials.js';
import type { RequestCache } from './RequestCache.js';
import type { RequestRedirect } from './RequestRedirect.js';
import type { ReferrerPolicy } from './ReferrerPolicy.js';
import type { RequestMode } from './RequestMode.js';
import type { RequestDestination } from './RequestDestination.js';

/**
 * Types
 */
type NativeFetch = typeof globalThis.fetch;

export namespace HTTP {
  /**
   * HTTP URL type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/url
   */
  export type URL = string;

  /**
   * HTTP request type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
   */
  export interface Request {
    // https://fetch.spec.whatwg.org/#requests
    /**
     * Indicates how the request will interact with the browser's cache to set request's cache.
     *
     * @example
     * ```ts
     * 'no-store'
     * ```
     */
    readonly cache?: RequestCache;
    /**
     * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.
     */
    readonly credentials?: RequestCredentials;
    readonly destination?: RequestDestination;
    /**
     * Request URL
     *
     * @example
     * 'https://foo.com'
     */
    readonly url: HTTP.URL;
    /**
     * Request headers
     *
     * @example
     * ```ts
     * { "Content-type": "application/json" }
     * ```
     */
    readonly headers?: RequestHeaders;
    /**
     * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
     */
    readonly integrity?: string;
    /**
     * Indicates whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion).
     */
    readonly redirect?: RequestRedirect;
    /**
     * Request referrer policy
     */
    readonly referrerPolicy?: ReferrerPolicy;
    /**
     * Request Method
     *
     * @example 'GET', 'POST'
     */
    readonly method?: Method;
    /**
     * A boolean to set request's keepalive.
     */
    readonly keepalive?: boolean;
    /**
     * Indicates whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
     */
    readonly mode?: RequestMode;
    /**
     * An optional BodyInit object to set request's body.
     */
    readonly body?: Option<BodyInit>;
    /**
     * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
     */
    readonly referrer?: string;
    /**
     * An AbortSignal to set request's signal.
     */
    // readonly signal?: Option<AbortSignal>;
    /**
     * Can only be undefined. Used to disassociate request from any Window.
     */
    readonly window?: undefined;
  }

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
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Request<Value> extends HTTP.Request {
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
  request: HTTP.Request
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
