import type { TimeoutError } from '@w5s/error';
import { NetworkError as NetworkErrorClass } from './HTTPError/NetworkError.js';
import { InvalidURL as InvalidURLClass } from './HTTPError/InvalidURL.js';
import { ParserError as ParserErrorClass } from './HTTPError/ParserError.js';

/**
 * Union type of http client errors
 */
export type HTTPError = HTTPError.NetworkError | HTTPError.InvalidURL | HTTPError.ParserError | TimeoutError;

/**
 * @namespace
 */
export const HTTPError = {
  NetworkError: NetworkErrorClass,
  InvalidURL: InvalidURLClass,
  ParserError: ParserErrorClass,
};
export namespace HTTPError {
  export type NetworkError = NetworkErrorClass;
  export type InvalidURL = InvalidURLClass;
  export type ParserError = ParserErrorClass;
}
