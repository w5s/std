import { ErrorClass } from './ErrorClass.js';

/**
 * An error reported when any operation times out
 */
export class TimeoutError extends ErrorClass({
  errorName: 'TimeoutError',
  errorMessage: 'Operation timed out',
}) {}
