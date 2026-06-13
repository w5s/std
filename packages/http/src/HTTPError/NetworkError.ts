import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * A network error when `fetch` fails
 */
export class NetworkError extends ErrorClass({
  errorMessage: 'Network error occurred',
  errorName: 'HTTPNetworkError',
}) {}
