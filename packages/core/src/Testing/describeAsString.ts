import type { AsString } from '../AsString.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#AsString} interface
 *
 * @example
 * ```typescript
 * describeAsString(Int, {
 *   test: () => [
 *     [Int(1), '1'],
 *     [Int(2), '2'],
 *   ],
 * });
 * ```
 * @param subject - The subject to test
 * @param properties - Object containing test properties
 * @param testingLibrary - Optional testing library to use. Defaults to the default
 */
export function describeAsString<T>(
  subject: AsString<T>,
  properties: {
    test: () => Array<[instance: T, expectedString: string]>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  describe('asString', () => {
    it.each(properties.test())('satisfies asString($0) == $1', (instance, string) => {
      expect(subject.asString(instance)).toEqual(string);
    });
  });
}
