import type { Indexable } from '../Indexable.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

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
 * @param subject - The object to test
 * @param cases - The test cases to run
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeIndexable<V, Index extends number | bigint>(
  subject: Indexable<V, Index>,
  cases: {
    index: Array<[index: Index, value: V]>;
    rangeSize?: Array<[start: V, end: V, expected: Index]>;
    range: Array<[start: V, end: V, expected: Array<V>]>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const at = cases.index.map(([index, expected]) => ({ index, expected }));
  const indexOf = cases.index.map(([expected, value]) => ({ value, expected }));
  const rangeSize =
    cases.rangeSize?.map(([start, end, expected]) => ({ start, end, expected })) ??
    cases.range.map(([start, end, expected]) => ({
      start,
      end,
      expected: subject.indexType === 'bigint' ? BigInt(expected.length) : (expected.length as Index),
    }));
  const range = cases.range.map(([start, end, expected]) => ({ start, end, expected }));

  // at
  (at.length === 0 ? describe.todo : describe)('at', () => {
    it.each(at)('satisfies at($index) == $expected', ({ index, expected }) => {
      const value = subject.at(index);
      expect(value).toEqual(expected);
    });
  });
  // indexOf
  (indexOf.length === 0 ? describe.todo : describe)('indexOf', () => {
    it.each(indexOf)('satisfies indexOf($value) == $expected', ({ value, expected }) => {
      const index = subject.indexOf(value);
      expect(index).toBe(expected);
    });
  });
  (rangeSize.length === 0 ? describe.todo : describe)('rangeSize', () => {
    it.each(rangeSize)('satisfies rangeSize($start, $end) == $expected', ({ start, end, expected }) => {
      const size = subject.rangeSize(start, end);
      expect(size).toBe(expected);
    });
  });
  (range.length === 0 ? describe.todo : describe)('range', () => {
    it.each(range)('satisfies range($start, $end) == $expected', ({ start, end, expected }) => {
      const array = [...subject.range(start, end)];
      expect(array).toEqual(expected);
    });
  });
}
