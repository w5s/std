import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

/**
 * Codec Error constructor
 *
 * @category Constructor
 */
export class CodecError extends ErrorClass({
  errorName: 'CodecError',
  errorMessage: 'The encoding or decoding operation failed',
})<{
  /**
   * Input given for encoding/decoding
   */
  input: unknown;
}> {}
