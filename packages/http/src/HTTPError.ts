import { CustomError, type TimeoutError } from '@w5s/error';

/**
 * Union type of http client errors
 */
export type HTTPError = HTTPError.NetworkError | HTTPError.InvalidURL | HTTPError.ParserError | TimeoutError;

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
  export const InvalidURL = CustomError.define<InvalidURL>({
    errorName: 'HTTPInvalidURLError',
    errorMessage: 'An invalid URL was provided',
  });

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
  export const NetworkError = CustomError.define<NetworkError>({
    errorName: 'HTTPNetworkError',
    errorMessage: 'Network error occurred',
  });

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
  export const ParserError = CustomError.define<ParserError>({
    errorName: 'HTTPParserError',
    errorMessage: 'Cannot parse response body',
  });
}
