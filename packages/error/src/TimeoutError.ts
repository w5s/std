import { CustomError } from './CustomError.js';

/**
 * An error reported when any operation times out
 */
export interface TimeoutError
  extends CustomError<{
    name: 'TimeoutError';
  }> {}

/**
 * TimeoutError constructor
 *
 * @category Constructor
 */
export const TimeoutError = CustomError.define<TimeoutError>({
  errorName: 'TimeoutError',
  errorMessage: 'Operation timed out',
});
