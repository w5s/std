import { ErrorClass } from './ErrorClass.js';

/**
 * InvariantError constructor
 *
 */
export class InvariantError extends ErrorClass({
  errorName: 'InvariantError',
  errorMessage: 'An invariant error occurred',
}) {}
