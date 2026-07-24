import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

/**
 * An error when url passed is invalid
 */
export class InvalidURL extends ErrorClass({
  errorMessage: 'An invalid URL was provided',
  errorName: 'HTTPInvalidURLError',
})<{ input: string }> {}
