import { ErrorClass } from './ErrorClass.js';

/**
 *  The TimeoutError object indicates an error that the operation took too much time and was canceled
 */
export class TimeoutError extends ErrorClass({
  errorMessage: 'Operation timed out',
  errorName: 'TimeoutError',
}) {}
