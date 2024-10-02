import { describe, it, expect } from 'vitest';
import { slice } from './slice.js';
import { empty } from './empty.js';

describe(slice, () => {
  const anyArray = [11, 4, 6, 2];
  type ItemType<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;
  const generate = <T extends { [key: string]: Array<unknown> }>(
    input: T,
  ): Array<{ [K in keyof T]: ItemType<T[K]> }> => {
    const addProperty = <O, P extends string, V>(element: O, property: P, values: Array<V>) =>
      values.map((value) => ({ ...element, [property]: value }));
    const genArray = <O, P extends string, V>(array: Array<O>, property: P, values: Array<V>) =>
      array.reduce<
        (O & {
          [x: string]: V;
        })[]
      >((_, element) => [..._, ...addProperty(element, property, values)], []);

    // @ts-ignore hard to type
    return Object.keys(input).reduce((acc, property) => {
      const values = input[property]!;

      return acc.length === 0 ? addProperty({}, property, values) : genArray(acc, property, values);
    }, []);
  };

  describe('helper generate()', () => {
    it('should generate data for test cases', () => {
      expect(
        generate({
          start: [undefined, 0, 1, -1],
          end: [undefined, -1, 1, 2],
        }),
      ).toEqual([
        {
          end: undefined,
          start: undefined,
        },
        {
          end: -1,
          start: undefined,
        },
        {
          end: 1,
          start: undefined,
        },
        {
          end: 2,
          start: undefined,
        },
        {
          end: undefined,
          start: 0,
        },
        {
          end: -1,
          start: 0,
        },
        {
          end: 1,
          start: 0,
        },
        {
          end: 2,
          start: 0,
        },
        {
          end: undefined,
          start: 1,
        },
        {
          end: -1,
          start: 1,
        },
        {
          end: 1,
          start: 1,
        },
        {
          end: 2,
          start: 1,
        },
        {
          end: undefined,
          start: -1,
        },
        {
          end: -1,
          start: -1,
        },
        {
          end: 1,
          start: -1,
        },
        {
          end: 2,
          start: -1,
        },
      ]);
    });
  });

  it('should return unchanged when empty', () => {
    const emptyArray = empty();
    expect(slice(emptyArray, 0, 1)).toBe(emptyArray);
  });
  it('should return empty if start >= end', () => {
    expect(slice([1, 2, 3], 1, 1)).toBe(empty());
    expect(slice([1, 2, 3], 0, 0)).toBe(empty());
    expect(slice([1, 2, 3], 1, 0)).toBe(empty());
  });
  it.each(
    generate({
      start: [undefined, 0],
      end: [undefined, anyArray.length, anyArray.length + 1],
    }),
  )('return unchanged when slice all parameters are nullish or array bounds', ({ start, end }) => {
    expect(slice(anyArray, start, end)).toBe(anyArray);
  });

  it.each(
    generate({
      start: [undefined, 0, 1, -1],
      end: [undefined, -1, 1, anyArray.length - 1, anyArray.length, anyArray.length + 1],
    }),
  )('should return same result as array.slice(%p)', ({ start, end }) => {
    expect(slice(anyArray, start, end)).toEqual(anyArray.slice(start ?? undefined, end ?? undefined));
  });
});
