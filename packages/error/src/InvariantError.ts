import { CustomError } from './CustomError.js';

/**
 * An error reported when any operation times out
 */
export interface InvariantError
  extends CustomError<{
    name: 'InvariantError';
  }> {}

/**
 * InvariantError constructor
 *
 * @category Constructor
 */
export const InvariantError = CustomError.define<InvariantError>({
  errorName: 'InvariantError',
  errorMessage: 'An invariant error occurred',
});
