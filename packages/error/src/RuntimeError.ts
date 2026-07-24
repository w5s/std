import { ErrorClass } from './ErrorClass.js';

/**
 * The RuntimeError object indicates an error that an error occurred during the runtime of a program.
 */
export class RuntimeError extends ErrorClass({
  errorMessage: 'An error occurred during program execution',
  errorName: 'RuntimeError',
}) {}
