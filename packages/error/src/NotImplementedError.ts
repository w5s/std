import { CustomError } from './CustomError.js';

/**
 * An error when wrong argument is passed to a function
 */
export interface NotImplementedError
  extends CustomError<{
    name: 'NotImplementedError';
  }> {}
/**
 * NotImplementedError constructor
 *
 * @example
 * ```typescript
 * function someFunction() {
 *   throw NotImplementedError();// message can be customized
 * }
 * ```
 *
 * @category Constructor
 */
export const NotImplementedError = CustomError.define<NotImplementedError>({
  errorName: 'NotImplementedError',
  errorMessage: 'Not implemented',
});
