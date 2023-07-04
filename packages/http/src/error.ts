import { DataError } from '@w5s/core/dist/dataError.js';

/**
 * Union type of http client errors
 */
export type HTTPError = HTTPError.NetworkError | HTTPError.InvalidURL | HTTPError.ParserError;

export namespace HTTPError {
  /**
   * An error when url passed is invalid
   */
  export interface InvalidURL
    extends DataError<{
      name: 'HTTPInvalidURLError';
      input: string;
    }> {}
  /**
   * InvalidURL constructor
   *
   * @category Constructor
   */
  export const InvalidURL = DataError.Make<InvalidURL>('HTTPInvalidURLError');

  /**
   * A network error when `fetch` fails
   */
  export interface NetworkError
    extends DataError<{
      name: 'HTTPNetworkError';
    }> {}
  /**
   * NetworkError constructor
   *
   * @category Constructor
   */
  export const NetworkError = DataError.Make<NetworkError>('HTTPNetworkError');

  /**
   * A parsing error when the body cannot be parsed
   */
  export interface ParserError
    extends DataError<{
      name: 'HTTPParserError';
    }> {}
  /**
   * ParserError constructor
   *
   * @category Constructor
   */
  export const ParserError = DataError.Make<ParserError>('HTTPParserError');
}
