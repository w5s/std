import type { Indexable } from '../Indexable.js';
import type { TestingLibrary } from './type.js';

import { defaultTestingLibrary } from './defaultTestingLibrary.js';

/**
 * Create a spec for {@link @w5s/core#Indexable} trait
 *
 * @example
 * ```typescript
 * describeIndexable(SomeIndexable, {
 *   index: [
 *     [0, 'a'],
 *     [1, 'a'],
 *   ],
 *   range: [
 *     ['a', 'a', ['a']],
 *     ['a', 'c', ['a', 'b', 'c']],
 *   ],
 *   // Optional test on rangeSize can be added
 *   rangeSize: [
 *     ['a', 'a', 1],
 *     ['a', 'b', 2],
 *   ],
 * });
 *
 * ```
 * @param subject The object to test
 * @param cases The test cases to run
 * @param cases.range
 * @param cases.rangeSize
 * @param cases.index
 * @param testingLibrary Optional testing library to use. Automatically detects if not provided.
 */
export function describeIndexable<V, Index extends bigint | number>(
  subject: Indexable<V, Index>,
  cases: {
    index: Array<[index: Index, value: V]>;
    range: Array<[start: V, end: V, expected: Array<V>]>;
    rangeSize?: Array<[start: V, end: V, expected: Index]>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, expect, it } = testingLibrary;
  const at = cases.index.map(([index, expected]) => ({ expected, index }));
  const indexOf = cases.index.map(([expected, value]) => ({ expected, value }));
  const rangeSize =
    cases.rangeSize?.map(([start, end, expected]) => ({ end, expected, start })) ??
    cases.range.map(([start, end, expected]) => ({
      end,
      expected: subject.indexType === 'bigint' ? BigInt(expected.length) : (expected.length as Index),
      start,
    }));
  const range = cases.range.map(([start, end, expected]) => ({ end, expected, start }));

  // at
  (at.length === 0 ? describe.todo : describe)('at', () => {
    it.each(at)('satisfies at($index) == $expected', ({ expected, index }) => {
      const value = subject.at(index);
      expect(value).toEqual(expected);
    });
  });
  // indexOf
  (indexOf.length === 0 ? describe.todo : describe)('indexOf', () => {
    it.each(indexOf)('satisfies indexOf($value) == $expected', ({ expected, value }) => {
      const index = subject.indexOf(value);
      expect(index).toBe(expected);
    });
  });
  (rangeSize.length === 0 ? describe.todo : describe)('rangeSize', () => {
    it.each(rangeSize)('satisfies rangeSize($start, $end) == $expected', ({ end, expected, start }) => {
      const size = subject.rangeSize(start, end);
      expect(size).toBe(expected);
    });
  });
  (range.length === 0 ? describe.todo : describe)('range', () => {
    it.each(range)('satisfies range($start, $end) == $expected', ({ end, expected, start }) => {
      const array = [...subject.range(start, end)];
      expect(array).toEqual(expected);
    });
  });
}
