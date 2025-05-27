import type { Codec } from '../Codec.js';
import type { Symbol } from '../Symbol.js';

/**
 * Returns the JSONSchema
 *
 * @example
 * ```typescript
 * Codec.schema(string);// { type: 'string' }
 * ```
 * @param codec - the codec module
 */
export function schema<T>(codec: Pick<Codec<T>, Symbol.schema>) {
  return codec.__schema__();
}
