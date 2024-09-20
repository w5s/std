import { Callable } from '@w5s/core/dist/Callable.js';
import type { PartialKeys } from '@w5s/core-type';
import type { Status } from './Status.js';
import type { URL } from './URL.js';
import type { ResponseType } from './ResponseType.js';

export const Response = Callable({
  [Callable.symbol]: <Body>(parameters: Response.Parameters<Body>): Response<Body> => {
    const { headers = new Headers(), ok = true, status, type = 'default', url, redirected = false, body } = parameters;
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
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: Status;
  readonly type: ResponseType;
  readonly url: URL;
  readonly redirected: boolean;
  readonly body: Body;
}
export namespace Response {
  export interface Parameters<Body> extends PartialKeys<Response<Body>, 'ok' | 'redirected' | 'type' | 'headers'> {}
}
