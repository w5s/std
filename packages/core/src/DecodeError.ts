import { CustomError } from '@w5s/error';

export interface DecodeError
  extends CustomError<{
    name: 'DecodeError';
    input: unknown;
  }> {}
/**
 * Decode Error constructor
 *
 * @category Constructor
 */
export const DecodeError = CustomError.define<DecodeError>('DecodeError');
