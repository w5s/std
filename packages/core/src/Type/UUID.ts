import type { Tag } from '../Tag.js';

import { Symbol } from '../Symbol.js';
import { define } from '../Tag/define.js';

/**
 * UUID string type
 */
export type UUID = Tag<'UUID'> & UUIDString;

export type UUIDString = `${string}-${string}-${string}-${string}-${string}`;

const uuidRegexp = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

/**
 * UUID Type and Codec definition
 *
 * @namespace
 */
export const UUID = define<UUIDString, UUID>({
  hasInstance: (anyValue) => typeof anyValue === 'string' && uuidRegexp.test(anyValue),
  [Symbol.schema]: () => ({
    format: 'uuid',
    type: 'string',
  }),
  typeName: 'UUID',
});
