import { defineCustomError, type CustomError } from '@w5s/error';

/**
 * Union type of http client errors
 */
export type HTTPError = HTTPError.NetworkError | HTTPError.InvalidURL | HTTPError.ParserError;

export namespace HTTPError {
  /**
   * An error when url passed is invalid
   */
  export interface InvalidURL
    extends CustomError<{
      name: 'HTTPInvalidURLError';
      input: string;
    }> {}
  /**
   * InvalidURL constructor
   *
   * @category Constructor
   */
  export const InvalidURL = defineCustomError<InvalidURL>('HTTPInvalidURLError');

  /**
   * A network error when `fetch` fails
   */
  export interface NetworkError
    extends CustomError<{
      name: 'HTTPNetworkError';
    }> {}
  /**
   * NetworkError constructor
   *
   * @category Constructor
   */
  export const NetworkError = defineCustomError<NetworkError>('HTTPNetworkError');

  /**
   * A parsing error when the body cannot be parsed
   */
  export interface ParserError
    extends CustomError<{
      name: 'HTTPParserError';
    }> {}
  /**
   * ParserError constructor
   *
   * @category Constructor
   */
  export const ParserError = defineCustomError<ParserError>('HTTPParserError');
}
