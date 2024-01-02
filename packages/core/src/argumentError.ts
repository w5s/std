import { defineError, type CustomError } from '@w5s/error';

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
export const ArgumentError = defineError<ArgumentError>('ArgumentError');
