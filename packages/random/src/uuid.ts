import { invariant } from '@w5s/core/dist/invariant.js';
import type { Tag } from '@w5s/core';

/**
 * UUID string type
 */
export type UUID = Tag<string, { UUID: true }>;

const uuidRegexp = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

/**
 * UUID constructor
 *
 * @example
 * ```typescript
 * const uuid = UUID('1c19548b-7cac-4222-b722-dc38f2870669');
 * ```
 * @category Constructor
 * @param value - the string representation
 */
export function UUID(value: `${string}-${string}-${string}-${string}`): UUID {
  return UUID.of(value);
}
export namespace UUID {
  /**
   * Returns an `UUID` with only `0`
   *
   * @example
   * ```typescript
   * const emptyUUID = UUID.empty();// '00000000-0000-0000-0000-000000000000'
   * ```
   */
  export function empty(): UUID {
    return '00000000-0000-0000-0000-000000000000' as UUID;
  }

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
  export function of(value: `${string}-${string}-${string}-${string}`): UUID {
    invariant(hasInstance(value), `${value} is not a valid UUID`);

    return value;
  }

  /**
   * Returns `true` if `anyValue` is a valid `UUID`
   *
   * @example
   * ```typescript
   * UUID.hasInstance(undefined);// false
   * UUID.hasInstance('');// false
   * UUID.hasInstance('c106a26a-21bb-5538-8bf2-57095d1976c1');// true
   * ```
   * @category Guard
   * @param anyValue - the value to tested
   */
  export function hasInstance(anyValue: unknown): anyValue is UUID {
    return typeof anyValue === 'string' && uuidRegexp.test(anyValue);
  }
}
