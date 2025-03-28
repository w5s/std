/* eslint-disable max-classes-per-file */
import type { TimeoutError } from '@w5s/error';
import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

/**
 * Union type of http client errors
 */
export type HTTPError = HTTPError.NetworkError | HTTPError.InvalidURL | HTTPError.ParserError | TimeoutError;

export namespace HTTPError {
  /**
   * An error when url passed is invalid
   */
  export class InvalidURL extends ErrorClass({
    errorName: 'HTTPInvalidURLError',
    errorMessage: 'An invalid URL was provided',
  })<{ input: string }> {}

  /**
   * A network error when `fetch` fails
   */
  export class NetworkError extends ErrorClass({
    errorName: 'HTTPNetworkError',
    errorMessage: 'Network error occurred',
  }) {}

  /**
   * A parsing error when the body cannot be parsed
   */
  export class ParserError extends ErrorClass({
    errorName: 'HTTPParserError',
    errorMessage: 'Cannot parse response body',
  }) {}
}
