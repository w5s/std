/* eslint-disable import/extensions */
import { invariant } from '@w5s/core/lib/invariant.js';
import type { Task } from '@w5s/core/lib/task.js';
import type { Tag } from '@w5s/core/lib/type.js';
import { HTTPClientError } from './error.js';

/**
 * Types
 */
type NativeFetch = typeof globalThis.fetch;

export namespace HTTPClient {
  /**
   * HTTP URL type
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/url
   */
  export type URL = string;

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
  export type Headers = Tag<Readonly<Record<string, string>>, { HTTPClientHeaders: true }>;

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
  export interface Request
    extends Readonly<
      Omit<globalThis.RequestInit, 'headers' | 'clone' | 'method'> & {
        // https://fetch.spec.whatwg.org/#requests
        url: HTTPClient.URL;
        headers?: HTTPClient.Headers;
        cache?: HTTPClient.Cache;
        redirect?: HTTPClient.Redirect;
        referrerPolicy?: HTTPClient.ReferrerPolicy;
        destination?: HTTPClient.RequestDestination;
        method?: HTTPClient.Method;
      }
    > {}

  export interface Response
    extends Readonly<
      Omit<globalThis.Response, /* 'headers' | */ 'clone'> & {
        // headers: Readonly<{ [key: string]: string }>;
      }
    > {}

  export interface Parser<Value, Error> {
    (response: HTTPClient.Response): Task<Value, Error>;
  }

  /**
   * Return a new {@link Task} that will send an HTTP request
   *
   * @example
   * ```typescript
   * const responseTask = HTTPClient.request({
   *   url: 'http://someurl.com',
   *   parse: parseText,
   * });
   * ```
   * @param requestObject - the request parameters
   */
  export function request<Value, Error>(
    requestObject: request.Request<Value, Error>
  ): Task<Value, HTTPClientError | Error> {
    const { parse, fetch: localFetch = getDefaultFetch(), ...fetchRequest } = requestObject;
    const responseTask = applyFetch(localFetch, fetchRequest);
    return {
      taskRun(resolve, reject, cancelerRef) {
        responseTask.taskRun((value) => parse(value).taskRun(resolve, reject, cancelerRef), reject, cancelerRef);
      },
    };
  }
  export namespace request {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Request<Value, Error> extends HTTPClient.Request {
      readonly parse: HTTPClient.Parser<Value, Error>;
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
  request: HTTPClient.Request
): Task<HTTPClient.Response, HTTPClientError.InvalidURL | HTTPClientError.NetworkError> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    taskRun: async (resolve, reject, cancelerRef) => {
      const { url, ...requestInfo } = request;

      const controller = new AbortController();
      cancelerRef.current = controller.abort.bind(controller);

      if (!isValidURL(url)) {
        reject(
          HTTPClientError.InvalidURL({
            message: 'Invalid URL',
            input: url,
          })
        );
      } else {
        try {
          const response = await fetchFn(url, {
            signal: controller.signal,
            ...requestInfo,
          });

          resolve(response);
        } catch (networkError: unknown) {
          reject(HTTPClientError.NetworkError({ cause: networkError }));
        }
      }
    },
  };
}
