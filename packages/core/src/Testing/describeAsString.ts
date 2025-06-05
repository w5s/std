import type { AsString } from '../AsString.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#AsString} interface
 *
 * @example
 * ```typescript
 * describeAsString(Int, (subject) => [
 *   [subject(1), '1'],
 *   [subject(2), '2'],
 * ]);
 * ```
 * @param subject - The subject to test
 * @param properties - Object containing test properties
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeAsString<S extends AsString<any>>(
  subject: S,
  properties: (subject: S) => Array<[instance: S extends AsString<infer T> ? T : never, expectedString: string]>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  describe('asString', () => {
    it.each(properties(subject))('satisfies asString($0) == $1', (instance, string) => {
      expect(subject.asString(instance)).toEqual(string);
    });
  });
}
