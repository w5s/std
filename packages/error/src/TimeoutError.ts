import { ErrorClass } from './ErrorClass.js';

/**
 *  The TimeoutError object indicates an error that the operation took too much time and was canceled
 */
export class TimeoutError extends ErrorClass({
  errorName: 'TimeoutError',
  errorMessage: 'Operation timed out',
}) {}
