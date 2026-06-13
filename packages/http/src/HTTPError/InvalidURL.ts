import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * An error when url passed is invalid
 */
export class InvalidURL extends ErrorClass({
  errorMessage: 'An invalid URL was provided',
  errorName: 'HTTPInvalidURLError',
})<{ input: string }> {}
