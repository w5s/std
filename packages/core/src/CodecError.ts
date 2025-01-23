import { CustomError } from '@w5s/error/dist/CustomError.js';

export interface CodecError
  extends CustomError<{
    name: 'CodecError';
    input: unknown;
  }> {}
/**
 * Codec Error constructor
 *
 * @category Constructor
 */
export const CodecError = CustomError.define<CodecError>({
  errorName: 'CodecError',
  errorMessage: 'The encoding or decoding operation failed',
});
