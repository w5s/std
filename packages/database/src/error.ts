import { CustomError } from '@w5s/error';

/**
 * An error reported when the Database fails to perform an operation
 */
export interface DatabaseError
  extends CustomError<{
    name: 'DatabaseError';
  }> {}
/**
 * DatabaseError constructor
 *
 * @category Constructor
 */
export const DatabaseError = CustomError.define<DatabaseError>('DatabaseError');
