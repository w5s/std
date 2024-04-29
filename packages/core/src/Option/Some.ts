import type { Option } from '../Option.js';

/**
 * An identity function that validates passed value
 *
 * @example
 * ```typescript
 * ```
 * @category Constructor
 * @param value - the non empty value
 */
export function Some<Value>(value: NonNullable<Value>): Option<Value> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value == null) {
    throw new TypeError('Value must be non null, non undefined value');
  }

  return value;
}
