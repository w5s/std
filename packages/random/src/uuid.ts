import { invariant } from '@w5s/invariant';
import { DecodeError, Codec } from '@w5s/core/dist/codec.js';
import type { Tag } from '@w5s/core';

/**
 * UUID string type
 */
export type UUID = Tag<string, { UUID: true }>;

const uuidRegexp = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const isUUID = (anyValue: unknown): anyValue is UUID => typeof anyValue === 'string' && uuidRegexp.test(anyValue);
const UUIDCodec = Codec<UUID>({
  encode: String,
  decode(value) {
    return isUUID(value)
      ? { _: 'Ok', ok: true, value }
      : {
          _: 'Error',
          ok: false,
          error: DecodeError({ message: `${String(value)} is not a valid UUID`, input: value }),
        };
  },
  schema() {
    return {
      type: 'string',
      format: 'uuid',
    };
  },
});

/**
 * A collection of functions to manipulate UUID
 *
 * @namespace
 */
export const UUID = {
  ...UUIDCodec,

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
    invariant(isUUID(value), `${value} is not a valid UUID`);
    return value;
  },

  /**
   * Returns `true` if `anyValue` is a valid `UUID`
   *
   * @example
   * ```typescript
   * UUID.hasInstance(undefined);// false
   * UUID.hasInstance('');// false
   * UUID.hasInstance('c106a26a-21bb-5538-8bf2-57095d1976c1');// true
   * ```
   * @category Type
   * @param anyValue - the value to tested
   */
  hasInstance(anyValue: unknown): anyValue is UUID {
    return isUUID(anyValue);
  },
};
