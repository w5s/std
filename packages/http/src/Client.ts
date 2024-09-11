import type { ResponseTimeout } from './ResponseTimeout.js';

export interface Client {
  /**
   * Response timeout setting
   */
  responseTimeout: ResponseTimeout;
}

export function Client(parameters: Partial<Client> = {}): Client {
  const { responseTimeout = 'default' } = parameters;
  return {
    responseTimeout,
  };
}
