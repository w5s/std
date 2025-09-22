import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

/**
 * An error when url passed is invalid
 */
export class InvalidURL extends ErrorClass({
  errorName: 'HTTPInvalidURLError',
  errorMessage: 'An invalid URL was provided',
})<{ input: string }> {}
