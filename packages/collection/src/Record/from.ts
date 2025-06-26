import type { RecordKey } from '../Record.js';

/**
 * Return a new {@link Record} from an iterable of [key, value]
 *
 * @example
 * ```typescript
 * const record = Record.from([['a', 1], ['b', 2]]); // frozen { a: 1, b: 2}
 * ```
 * @category Constructor
 */
export function from<Key extends RecordKey, Value>(iterable: Iterable<[Key, Value]>): Record<Key, Value> {
  const returnValue = {} as unknown as {
    [P in Key]: Value;
  };
  for (const [key, value] of iterable) {
    returnValue[key] = value;
  }

  return returnValue;
}
