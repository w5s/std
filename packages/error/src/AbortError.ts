import { ErrorClass } from './ErrorClass.js';

/**
 * The AbortError object indicates an error that the operation was aborted.
 *
 */
export class AbortError extends ErrorClass({
  errorMessage: 'This operation was aborted',
  errorName: 'AbortError',
}) {}
