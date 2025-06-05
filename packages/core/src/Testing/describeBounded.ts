import type { Bounded } from '../Bounded.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Bounded} trait
 *
 * @example
 * ```typescript
 * describeBounded(SomeBounded, {
 *   minValue: // ...
 *   maxValue: // ...
 * });
 *
 * ```
 * @param subject - the subject to test
 * @param snapshot - the snapshot to compare against
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeBounded<V>(
  subject: Bounded<V>,
  snapshot: Bounded<V>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  describe('minValue', () => {
    it('is a specific value', () => {
      expect(subject.minValue).toEqual(snapshot.minValue);
    });
  });
  describe('maxValue', () => {
    it('is a specific value', () => {
      expect(subject.maxValue).toEqual(snapshot.maxValue);
    });
  });
}
