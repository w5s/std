import { DataError } from '@w5s/core/lib/dataError.js';

/**
 * Union type of http client errors
 */
export type HTTPClientError = HTTPClientError.NetworkError | HTTPClientError.InvalidURL;

export namespace HTTPClientError {
  /**
   * An error when url passed is invalid
   */
  export interface InvalidURL
    extends DataError<{
      name: 'HTTPClientInvalidURLError';
      input: string;
    }> {}
  /**
   * InvalidURL constructor
   *
   * @category Constructor
   */
  export const InvalidURL = DataError.Make<InvalidURL>('HTTPClientInvalidURLError');

  /**
   * A network error when `fetch` fails
   */
  export interface NetworkError
    extends DataError<{
      name: 'HTTPClientNetworkError';
    }> {}
  /**
   * NetworkError constructor
   *
   * @category Constructor
   */
  export const NetworkError = DataError.Make<NetworkError>('HTTPClientNetworkError');

  /**
   * A parsing error when the body cannot be parsed
   */
  export interface ParserError
    extends DataError<{
      name: 'HTTPClientParserError';
    }> {}
  /**
   * ParserError constructor
   *
   * @category Constructor
   */
  export const ParserError = DataError.Make<ParserError>('HTTPClientParserError');
}
