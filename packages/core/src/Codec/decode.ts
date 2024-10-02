import type { Codec } from '../Codec.js';
import type { Result } from '../Result.js';
import { Error } from '../Result/Error.js';
import { Ok } from '../Result/Ok.js';
import { DecodeError } from '../DecodeError.js';

/**
 * Returns a `Result` containing the decoded `input`
 *
 * @example
 * ```typescript
 * const codec: Codec<Date> = dateISO;
 * const input = '2022-07-31T14:04:48.449Z';
 * const decoded = Codec.decode(codec, input);// Result.Ok('2022-07-31T14:04:48.449Z')
 * ```
 * @param codec - the decoder module
 * @param input - the input to encode
 */
export function decode<T>(codec: Pick<Codec<T>, 'codecDecode'>, input: unknown): Result<T, DecodeError> {
  return codec.codecDecode(input, {
    ok: Ok as Codec.Context<T>['ok'],
    error: (inputError, asType) =>
      Error(
        DecodeError({
          message: `Cannot decode ${String(inputError)}${asType == null ? '' : ` as ${asType}`}`,
          input: inputError,
        }),
      ),
  });
}
