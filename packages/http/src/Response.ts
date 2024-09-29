import { Callable } from '@w5s/core/dist/Callable.js';
import type { PartialKeys } from '@w5s/core-type';
import type { Status } from './Status.js';
import type { URL } from './URL.js';
import type { ResponseType } from './ResponseType.js';
import type { Headers } from './Headers.js';
import { empty } from './Headers/empty.js';
import { from } from './Response/from.js';

export const Response = Callable({
  from,
  [Callable.symbol]: <Body>(parameters: Response.Parameters<Body>): Response<Body> => {
    const { headers = empty(), ok = true, status, type = 'default', url, redirected = false, body } = parameters;
    return {
      headers,
      ok,
      status,
      type,
      url,
      redirected,
      body,
    };
  },
});

export interface Response<Body> {
  /**
   * The headers read-only property of the Response interface contains the Headers object associated with the response.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/headers
   */
  readonly headers: Headers;
  /**
   * The ok read-only property of the Response interface contains a Boolean stating whether the response was successful (status in the range 200-299) or not.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
   */
  readonly ok: boolean;
  /**
   * The read-only response {@link Status}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/status
   */
  readonly status: Status;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/type
   */
  readonly type: ResponseType;
  readonly url: URL;
  /**
   * The read-only redirected property of the {@link Response} interface indicates whether or not the response is the result of a request you made which was redirected.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/redirected
   */
  readonly redirected: boolean;
  readonly body: Body;
}
export namespace Response {
  export interface Parameters<Body> extends PartialKeys<Response<Body>, 'ok' | 'redirected' | 'type' | 'headers'> {}
}
