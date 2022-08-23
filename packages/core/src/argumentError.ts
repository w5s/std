import { DataError } from './dataError.js';

/**
 * An error when wrong argument is passed to a function
 */
export interface ArgumentError
  extends DataError<{
    name: 'ArgumentError';
  }> {}
/**
 * ArgumentError constructor
 *
 * @category Constructor
 */
export const ArgumentError = DataError.Make<ArgumentError>('ArgumentError');
