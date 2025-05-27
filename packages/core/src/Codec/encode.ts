import type { Codec } from '../Codec.js';
import type { Symbol } from '../Symbol.js';

/**
 * Returns the encoded `input`
 *
 * @example
 * ```typescript
 * const codec: Codec<Date> = dateISO;
 * const input = new Date('2022-07-31T14:04:48.449Z');
 * const encoded = Codec.encode(codec, input);// '2022-07-31T14:04:48.449Z'
 * ```
 * @param codec - the encoder module
 * @param input - the input to encode
 */
export function encode<T>(codec: Pick<Codec<T>, Symbol.encode>, input: T): unknown {
  return codec.__encode__(input);
}
