import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * An error reported when the Database fails to perform an operation
 */
export class DatabaseError extends ErrorClass({
  errorMessage: 'An unknown error occurred with database',
  errorName: 'DatabaseError',
}) {}
