import type { Codec } from '../Codec.js';
import type { Result } from '../Result.js';
import { Error } from '../Result/Error.js';
import { Ok } from '../Result/Ok.js';
import { CodecError } from '../CodecError.js';
import type { Symbol } from '../Symbol.js';

function inspect(anyValue: unknown) {
  return typeof anyValue === 'string' ? `"${anyValue}"` : String(anyValue);
}

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
export function decode<T>(codec: Pick<Codec<T>, Symbol.decode>, input: unknown): Result<T, CodecError> {
  return codec.__decode__(input, {
    ok: Ok as Codec.Context<T>['ok'],
    error: (inputError, asType) =>
      Error(
        new CodecError({
          message: `Cannot decode ${inspect(inputError)}${asType == null ? '' : ` as ${asType}`}`,
          input: inputError,
        }),
      ),
  });
}
