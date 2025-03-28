import { ErrorClass } from './ErrorClass.js';

/**
 * AbortError constructor
 *
 */
export class AbortError extends ErrorClass({
  errorName: 'AbortError',
  errorMessage: 'The operation was aborted',
}) {}
