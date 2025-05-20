import { ErrorClass } from './ErrorClass.js';

/**
 * The InvariantError object indicates an error that the program violates a fundamental assumption or condition.
 * This exception is typically used to indicate bugs in the code, such as incorrect assumptions about the state of an object or function.
 * The InvariantError object should be thrown when a violation of an invariant occurs and should not be caught by the program.
 * Instead, it should be handled by the program's error handling mechanism.
 *
 */
export class InvariantError extends ErrorClass({
  errorName: 'InvariantError',
  errorMessage: 'An invariant error occurred',
}) {}
