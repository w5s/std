import { invariant } from '@w5s/invariant';
import type { Task, Tag, Option } from '@w5s/core';
import { wrap } from '@w5s/core/dist/Task/wrap.js';
import { HTTPError } from './HTTPError.js';
import type { HTTPParser } from './HTTPParser.js';

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
   * HTTP credentials
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
   */
  export type Credentials = 'include' | 'omit' | 'same-origin';

  /**
   * HTTP Method type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/method
   */
  export type Method = string;

  /**
   * HTTP redirect type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect
   */
  export type Redirect = 'follow' | 'error' | 'manual';

  /**
   * HTTP referrer policy type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy
   */
  export type ReferrerPolicy =
    | ''
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'same-origin'
    | 'origin'
    | 'strict-origin'
    | 'origin-when-cross-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';

  /**
   * HTTP request destination type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/destination
   */
  export type RequestDestination =
    | ''
    | 'audio'
    | 'audioworklet'
    | 'document'
    | 'embed'
    | 'font'
    | 'frame'
    | 'iframe'
    | 'image'
    | 'manifest'
    | 'object'
    | 'paintworklet'
    | 'report'
    | 'script'
    | 'sharedworker'
    | 'style'
    | 'track'
    | 'video'
    | 'worker'
    | 'xslt';

  /**
   * HTTP cache type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
   */
  export type Cache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';

  /**
   * HTTP header record type
   */
  export type Headers = Readonly<Record<string, string>> & Tag<'HTTPHeaders'>;

  /**
   * HTTP header record constructor
   *
   * @example
   * ```typescript
   * const headersFromIterable = Headers([
   *  ['key1', 'value1'],
   *  ['key2', 'value2']
   * ]);// { key1: 'value1, key2: 'value2' }
   * const headersFromObject = Headers({
   *  key1: 'value1',
   *  key2: 'value2'
   * });// { key1: 'value1, key2: 'value2' }
   *```
   * @category Constructor
   * @param values - a record or iterable to initialize
   */
  export function Headers(values: Iterable<readonly [string, string]> | Record<string, string>): Headers {
    if (Symbol.iterator in values) {
      const returnValue: Record<string, string> = {};
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      for (const [key, value] of values as Iterable<readonly [string, string]>) {
        returnValue[key] = value;
      }

      return returnValue as Headers;
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      ...values,
    } as Headers;
  }
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
    readonly cache?: HTTP.Cache;
    /**
     * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.
     */
    readonly credentials?: HTTP.Credentials;
    readonly destination?: HTTP.RequestDestination;
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
    readonly headers?: HTTP.Headers;
    /**
     * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
     */
    readonly integrity?: string;
    /**
     * Indicates whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion).
     */
    readonly redirect?: HTTP.Redirect;
    /**
     * Request referrer policy
     */
    readonly referrerPolicy?: HTTP.ReferrerPolicy;
    /**
     * Request Method
     *
     * @example 'GET', 'POST'
     */
    readonly method?: HTTP.Method;
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

  export interface Response
    extends Readonly<
      Omit<globalThis.Response, /* 'headers' | */ 'clone'> & {
        // headers: Readonly<{ [key: string]: string }>;
      }
    > {}

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
    const responseTask = applyFetch(localFetch, fetchRequest);
    return {
      taskRun(parameters) {
        responseTask.taskRun({
          ...parameters,
          resolve: (value) => parse(value).taskRun(parameters),
        });
      },
    };
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
): Task<HTTP.Response, HTTPError.InvalidURL | HTTPError.NetworkError> {
  return wrap(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async ({ resolve, reject, canceler }) => {
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
    }
  );
}
