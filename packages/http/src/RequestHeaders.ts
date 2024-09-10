/**
 * HTTP header record type
 */
export type RequestHeaders = Readonly<Record<string, string>>;

/**
 * HTTP header record constructor
 *
 * @example
 * ```typescript
 * const headersFromIterable = RequestHeaders([
 *  ['key1', 'value1'],
 *  ['key2', 'value2']
 * ]);// { key1: 'value1, key2: 'value2' }
 * const headersFromObject = RequestHeaders({
 *  key1: 'value1',
 *  key2: 'value2'
 * });// { key1: 'value1, key2: 'value2' }
 *```
 * @category Constructor
 * @param values - a record or iterable to initialize
 */
export function RequestHeaders(values: Iterable<readonly [string, string]> | Record<string, string>): RequestHeaders {
  if (Symbol.iterator in values) {
    const returnValue: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    for (const [key, value] of values as Iterable<readonly [string, string]>) {
      returnValue[key] = value;
    }

    return returnValue as RequestHeaders;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...values,
  } as RequestHeaders;
}
