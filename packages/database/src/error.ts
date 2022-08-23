import { DataError } from '@w5s/core/lib/dataError.js';

/**
 * An error reported when the Database fails to perform an operation
 */
export interface DatabaseError
  extends DataError<{
    name: 'DatabaseError';
  }> {}
/**
 * DatabaseError constructor
 *
 * @category Constructor
 */
export const DatabaseError = DataError.Make<DatabaseError>('DatabaseError');
