import { Callable } from './Callable.js';
import { UUID as UUIDType, type UUIDString } from './Type/UUID.js';

/**
 * UUID string type
 */
export type UUID = UUIDType;

/**
 * A collection of functions to manipulate UUID
 *
 * @namespace
 */
export const UUID = Callable({
  ...UUIDType,
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
  of(value: UUIDString): UUID {
    return UUIDType.wrap(value);
  },
});
