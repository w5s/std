import type { Bounded } from '../Bounded.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Bounded} trait
 *
 * @example
 * ```typescript
 * describeBounded({ describe, it, expect })(SomeBounded, {
 *   minValue: // ...
 *   maxValue: // ...
 * });
 *
 * ```
 * @param testingLibrary
 */
export function describeBounded(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <V>(subject: Bounded<V>, snapshot: Bounded<V>) => {
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
  };
}
