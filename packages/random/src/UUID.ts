import { Tag } from '@w5s/core/dist/Tag.js';

/**
 * UUID string type
 */
export type UUID = `${string}-${string}-${string}-${string}` & Tag<'UUID'>;

const uuidRegexp = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

const UUIDType = Tag.define<`${string}-${string}-${string}-${string}`, UUID>({
  typeName: 'UUID',
  hasInstance: (anyValue) => typeof anyValue === 'string' && uuidRegexp.test(anyValue),
  codecSchema: () => ({
    type: 'string',
    format: 'uuid',
  }),
});

/**
 * A collection of functions to manipulate UUID
 *
 * @namespace
 */
export const UUID = Object.assign(UUIDType, {
  /**
   * Returns an `UUID` with only `0`
   *
   * @example
   * ```typescript
   * const emptyUUID = UUID.empty();// '00000000-0000-0000-0000-000000000000'
   * ```
   * @category Constructor
   */
  empty(): UUID {
    return '00000000-0000-0000-0000-000000000000' as UUID;
  },

  /**
   * UUID constructor
   *
   * @example
   * ```typescript
   * const uuid = UUID.of('1c19548b-7cac-4222-b722-dc38f2870669');
   * ```
   * @category Constructor
   * @param value - the string representation
   */
  of(value: `${string}-${string}-${string}-${string}`): UUID {
    return UUIDType.wrap(value);
  },
});
