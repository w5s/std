import { Ref } from '@w5s/core/dist/Ref.js';
import { Client } from '../Client.js';

export interface FakeClient<FetchFn extends Client['fetch']> extends Omit<Client, 'fetch'> {
  /**
   * Reference to fetch function
   */
  fetch: Ref<FetchFn>;
}

export interface FakeClientOptions<FetchFn extends Client['fetch']> extends Client.Options {
  /**
   * Initial fetch function to use for the fake client
   */
  fetch: FetchFn;
}

export function FakeClient<FetchFn extends Client['fetch']>(
  parameters: FakeClientOptions<FetchFn>,
): FakeClient<FetchFn> {
  const { fetch: initialFetch, ...otherParameters } = parameters;
  const fetch = Ref(initialFetch);
  const client = Client({ ...otherParameters, fetch: (...args) => fetch.current(...args) });
  return {
    ...client,
    fetch,
  };
}
