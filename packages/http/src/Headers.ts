/**
 * HTTP header record type
 */
export type Headers = Readonly<Record<string, string>>;

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
export function Headers(values: Iterable<readonly [string, string]> | Record<string, string>): Headers {
  if (Symbol.iterator in values) {
    const returnValue: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    for (const [key, value] of values as Iterable<readonly [string, string]>) {
      returnValue[key] = value;
    }

    return returnValue as Headers;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...values,
  } as Headers;
}
