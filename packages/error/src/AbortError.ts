import { CustomError } from './CustomError.js';

/**
 * An error when a task was aborted
 */
export interface AbortError extends CustomError<{ name: 'AbortError' }> {}

/**
 * AbortError constructor
 *
 * @category Constructor
 */
export const AbortError = CustomError.define<AbortError>({
  errorName: 'AbortError',
  errorMessage: 'The operation was aborted',
});
