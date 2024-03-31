import { defineCustomError, type CustomError } from './CustomError.js';

/**
 * An error when wrong argument is passed to a function
 */
export interface ArgumentError
  extends CustomError<{
    name: 'ArgumentError';
  }> {}
/**
 * ArgumentError constructor
 *
 * @category Constructor
 */
export const ArgumentError = defineCustomError<ArgumentError>('ArgumentError');
