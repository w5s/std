import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * An error reported when the Database fails to perform an operation
 */
export class DatabaseError extends ErrorClass({
  errorName: 'DatabaseError',
  errorMessage: 'An unknown error occurred with database',
}) {}
