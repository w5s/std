import { Symbol } from '../Symbol.js';
import type { Tag } from '../Tag.js';
import { define } from '../Tag/define.js';

export type UUIDString = `${string}-${string}-${string}-${string}-${string}`;
/**
 * UUID string type
 */
export type UUID = UUIDString & Tag<'UUID'>;

const uuidRegexp = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

/**
 * UUID Type and Codec definition
 *
 * @namespace
 */
export const UUID = define<UUIDString, UUID>({
  typeName: 'UUID',
  hasInstance: (anyValue) => typeof anyValue === 'string' && uuidRegexp.test(anyValue),
  [Symbol.schema]: () => ({
    type: 'string',
    format: 'uuid',
  }),
});
