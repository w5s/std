import { DataError } from '@w5s/core';

/**
 * An error reported when the DatabaseClient fails to perform an operation
 */
export interface DatabaseClientError
  extends DataError<{
    name: 'DatabaseClientError';
  }> {}
/**
 * DatabaseClientError constructor
 *
 * @category Constructor
 */
export const DatabaseClientError = DataError.Make<DatabaseClientError>('DatabaseClientError');
