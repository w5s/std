import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

/**
 * Codec Error constructor
 *
 * @category Constructor
 */
export class CodecError extends ErrorClass({
  errorMessage: 'The encoding or decoding operation failed',
  errorName: 'CodecError',
})<{
  /**
   * Input given for encoding/decoding
   */
    input: unknown;
  }> {}
