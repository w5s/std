import { invariant } from '@w5s/invariant';
import type { ResponseTimeout } from './ResponseTimeout.js';

export interface Client {
  /**
   * Fetch function. Default to `globalThis.fetch`.
   */
  fetch: typeof globalThis.fetch;
  /**
   * Response timeout setting
   */
  responseTimeout: ResponseTimeout;
}

export function Client(parameters: Partial<Client> = {}): Client {
  const { responseTimeout = 'default', fetch = getDefaultFetch() } = parameters;
  return {
    fetch,
    responseTimeout,
  };
}

function getDefaultFetch() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  invariant(globalThis.fetch != null, 'globalThis.fetch is not defined');
  return globalThis.fetch;
}
