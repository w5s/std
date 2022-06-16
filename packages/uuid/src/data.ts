// eslint-disable-next-line import/extensions
import { invariant } from '@w5s/core/lib/invariant.js';
import type { Tag } from '@w5s/core/lib/type.js';

/**
 * UUID string type
 */
export type UUID = Tag<string, { UUID: true }>;

const uuidRegexp = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

/**
 * UUID constructor
 *
 * @category Constructor
 * @param value - the string representation
 */
export function UUID(value: `${string}-${string}-${string}-${string}`): UUID {
  invariant(UUID.hasInstance(value), `${value} is not a valid UUID`);

  return value;
}
export namespace UUID {
  /**
   * Returns an `UUID` with only `0`
   */
  export function empty(): UUID {
    return '00000000-0000-0000-0000-000000000000' as UUID;
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
