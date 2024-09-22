import { Callable } from '@w5s/core/dist/Callable.js';
import { Headers as HeadersType } from './Headers/Headers.js';
import { empty } from './Headers/empty.js';

/**
 * HTTP header record type
 */
export interface Headers extends HeadersType {}

/**
 * HTTP header record constructor
 *
 * @example
 * ```typescript
 * const headersFromIterable = Headers([
 *  ['key1', 'value1'],
 *  ['key2', 'value2']
 * ]);// { key1: 'value1, key2: 'value2' }
 * const headersFromObject = Headers({
 *  key1: 'value1',
 *  key2: 'value2'
 * });// { key1: 'value1, key2: 'value2' }
 *```
 * @category Constructor
 * @param values - a record or iterable to initialize
 */
export const Headers = Callable({
  ...HeadersType,
  empty,
  [Callable.symbol]: (values: Iterable<readonly [string, string]> | Record<string, string>): Headers =>
    Symbol.iterator in values
      ? Object.fromEntries(values)
      : {
          ...values,
        },
});
