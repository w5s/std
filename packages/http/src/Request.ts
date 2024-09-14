import type { Option } from '@w5s/core';
import type { Method } from './Method.js';
import type { RequestHeaders } from './RequestHeaders.js';
import type { RequestCredentials } from './RequestCredentials.js';
import type { RequestDestination } from './RequestDestination.js';
import type { RequestCache } from './RequestCache.js';
import type { RequestRedirect } from './RequestRedirect.js';
import type { ReferrerPolicy } from './ReferrerPolicy.js';
import type { RequestMode } from './RequestMode.js';
import type { RequestTimeout } from './RequestTimeout.js';

type URL = string;

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
  readonly url: URL;
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
  /**
   * Request timeout setting
   */
  readonly timeout?: RequestTimeout;
}
