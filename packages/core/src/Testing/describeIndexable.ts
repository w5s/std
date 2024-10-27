import type { Indexable } from '../Indexable.js';
import { Int } from '../Int.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for {@link @w5s/core#Indexable} trait
 *
 * @example
 * ```ts
 * describeIndexable({ describe, it, expect })(SomeIndexable, {
 *   at: [
 *     [0, 'a'],
 *     [1, 'a'],
 *   ],
 *   indexOf: [
 *     ['a', 0],
 *     ['b', 1],
 *   ],
 *   rangeSize: [
 *     ['a', 'a', 1],
 *     ['a', 'b', 2],
 *   ],
 *   range: [
 *     ['a', 'a', ['a']],
 *     ['a', 'c', ['a', 'b', 'c']],
 *   ]
 * });
 *
 * ```
 * @param testingLibrary
 */
export function describeIndexable(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <V, Index = Int>(
    subject: Indexable<V, Index>,
    cases: {
      at: Array<[index: Index, expectedValue: V]>;
      indexOf: Array<[char: V, expectedValue: Index]>;
      rangeSize: Array<[start: V, end: V, expected: Index]>;
      range: Array<[start: V, end: V, expected: Array<V>]>;
    },
  ) => {
    const at = cases.at.map(([index, expected]) => ({ index, expected }));
    const indexOf = cases.indexOf.map(([value, expected]) => ({ value, expected }));
    const rangeSize = cases.rangeSize.map(([start, end, expected]) => ({ start, end, expected }));
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
  };
}
