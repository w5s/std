import { ErrorClass } from './ErrorClass.js';

/**
 * The ArgumentError object indicates an error that the program wrong argument is passed to a function
 */
export class ArgumentError extends ErrorClass({
  errorMessage: 'Some arguments are invalid or missing',
  errorName: 'ArgumentError',
}) {}
