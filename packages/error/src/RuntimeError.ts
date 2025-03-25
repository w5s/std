import { ErrorClass } from './ErrorClass.js';

/**
 * Error that occurred during program execution
 */
export class RuntimeError extends ErrorClass({
  errorName: 'RuntimeError',
  errorMessage: 'An error occurred during program execution',
}) {}
