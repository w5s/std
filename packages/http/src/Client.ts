import { invariant } from '@w5s/invariant';
import type { Option } from '@w5s/core';
import type { TimeDuration } from '@w5s/time';
import type { RequestTimeout } from './RequestTimeout.js';

export interface Client {
  /**
   * Fetch function. Default to `globalThis.fetch`.
   */
  fetch: typeof globalThis.fetch;
  /**
   * Response timeout setting
   */
  timeout: RequestTimeout;
}

export function Client(parameters: Partial<Client> = {}): Client {
  const { timeout = 'default', fetch = getDefaultFetch() } = parameters;
  return {
    fetch,
    timeout,
  };
}
export namespace Client {
  export const defaultTimeoutDuration = (30 * 1000) as TimeDuration; // 30 seconds

  export function getTimeoutDuration(client: Client): Option<TimeDuration> {
    const { timeout } = client;
    return timeout === 'none' ? undefined : timeout === 'default' ? defaultTimeoutDuration : timeout;
  }
}

function getDefaultFetch() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  invariant(globalThis.fetch != null, 'globalThis.fetch is not defined');
  return globalThis.fetch;
}
