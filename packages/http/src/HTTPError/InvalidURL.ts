import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * An error when url passed is invalid
 */
export class InvalidURL extends ErrorClass({
  errorName: 'HTTPInvalidURLError',
  errorMessage: 'An invalid URL was provided',
})<{ input: string }> {}
