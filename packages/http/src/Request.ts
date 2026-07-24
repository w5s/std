import type { Option } from '@w5s/core';

import type { Headers } from './Headers.js';
import type { Method } from './Method.js';
import type { ReferrerPolicy } from './ReferrerPolicy.js';
import type { RequestCache } from './RequestCache.js';
import type { RequestCredentials } from './RequestCredentials.js';
import type { RequestDestination } from './RequestDestination.js';
import type { RequestMode } from './RequestMode.js';
import type { RequestRedirect } from './RequestRedirect.js';
import type { RequestTimeout } from './RequestTimeout.js';
import type { URL } from './URL.js';

/**
 * HTTP request type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 */
export interface Request {
  // https://fetch.spec.whatwg.org/#requests

  /**
   * An optional BodyInit object to set request's body.
   */
  readonly body?: Option<BodyInit>;

  /**
   * Indicates how the request will interact with the browser's cache to set request's cache.
   *
   * @example
   * ```typescript
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
   * Request headers
   *
   * @example
   * ```typescript
   * { "Content-type": "application/json" }
   * ```
   */
  readonly headers?: Headers;

  /**
   * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
   */
  readonly integrity?: string;

  /**
   * A boolean to set request's keepalive.
   */
  readonly keepalive?: boolean;

  /**
   * Request Method
   *
   * @example 'GET', 'POST'
   */
  readonly method?: Method;

  /**
   * Indicates whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
   */
  readonly mode?: RequestMode;

  /**
   * Indicates whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion).
   */
  readonly redirect?: RequestRedirect;

  /**
   * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
   */
  readonly referrer?: string;

  /**
   * Request referrer policy
   */
  readonly referrerPolicy?: ReferrerPolicy;

  /**
   * Request timeout setting
   */
  readonly timeout?: RequestTimeout;

  /**
   * An AbortSignal to set request's signal.
   */
  // readonly signal?: Option<AbortSignal>;

  /**
   * Request URL
   *
   * @example
   * 'https://foo.com'
   */
  readonly url: URL;

  /**
   * Can only be undefined. Used to disassociate request from any Window.
   */
  readonly window?: undefined;
}
