import { ErrorClass } from './ErrorClass.js';

/**
 * ArgumentError constructor.
 * An error when wrong argument is passed to a function
 */
export class ArgumentError extends ErrorClass({
  errorName: 'ArgumentError',
  errorMessage: 'Some arguments are invalid or missing',
}) {}
