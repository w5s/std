import type { TimeoutError } from '@w5s/error';

import { InvalidURL as InvalidURLClass } from './HTTPError/InvalidURL.js';
import { NetworkError as NetworkErrorClass } from './HTTPError/NetworkError.js';
import { ParserError as ParserErrorClass } from './HTTPError/ParserError.js';

/**
 * Union type of http client errors
 */
export type HTTPError = HTTPError.InvalidURL | HTTPError.NetworkError | HTTPError.ParserError | TimeoutError;

/**
 * @namespace
 */
export const HTTPError = {
  InvalidURL: InvalidURLClass,
  NetworkError: NetworkErrorClass,
  ParserError: ParserErrorClass,
};
export namespace HTTPError {
  export type InvalidURL = InvalidURLClass;
  export type NetworkError = NetworkErrorClass;
  export type ParserError = ParserErrorClass;
}
