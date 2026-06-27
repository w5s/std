import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * A network error when `fetch` fails
 */
export class NetworkError extends ErrorClass({
  errorName: 'HTTPNetworkError',
  errorMessage: 'Network error occurred',
}) {}
