import { CustomError } from './CustomError.js';

/**
 * Error that occurred during program execution
 */
export interface RuntimeError extends CustomError<{ name: 'RuntimeError' }> {}

export const RuntimeError = CustomError.define<RuntimeError>({
  errorName: 'RuntimeError',
  errorMessage: 'An error occurred during program execution',
});
