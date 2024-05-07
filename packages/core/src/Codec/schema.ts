import type { Codec } from '../Codec.js';

/**
 * Returns the JSONSchema
 *
 * @example
 * ```typescript
 * Codec.schema(string);// { type: 'string' }
 * ```
 * @param codec - the codec module
 */
export function schema<T>(codec: Pick<Codec<T>, 'codecSchema'>) {
  return codec.codecSchema();
}
