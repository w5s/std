const _empty = Object.freeze({}) as Record<any, any>;

/**
 * Return an empty {@link Record}
 *
 * @example
 * ```typescript
 * const empty = Record.empty(); // frozen {}
 * ```
 * @category Constructor
 */
export function empty<Key extends string | symbol, Value = any>(): Record<Key, Value> {
  return _empty;
}
