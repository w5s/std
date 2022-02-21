import { Array } from './array.js';
import { Option } from './option.js';

describe('Array', () => {
  type ItemType<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;
  const generate = <T extends { [key: string]: Array<unknown> }>(
    input: T
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const values = input[property]!;

      return acc.length === 0 ? addProperty({}, property, values) : genArray(acc, property, values);
    }, []);
  };

  describe(generate, () => {
    test('should generate data for test cases', () => {
      expect(
        generate({
          start: [undefined, 0, 1, -1],
          end: [undefined, -1, 1, 2],
        })
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
  describe(Array.empty, () => {
    test('should return an array with no element', () => {
      expect(Array.empty()).toEqual([]);
    });
    test('should same instance', () => {
      const empty = Array.empty();
      expect(Array.empty()).toBe(empty);
    });
  });
  describe(Array.of, () => {
    test('should return empty array when no argument', () => {
      expect(Array.of()).toEqual([]);
    });
    test('should return an array of items', () => {
      expect(Array.of(1, 2, 3)).toEqual([1, 2, 3]);
    });
  });
  describe(Array.at, () => {
    test('should return Option.None when index is not defined', () => {
      expect(Array.at([1], 1)).toBe(Option.None);
    });
    test('should return element at index', () => {
      expect(Array.at([1], 0)).toBe(1);
    });
    test('should return last when negative', () => {
      expect(Array.at([1, 2], -1)).toBe(2);
    });
  });
  describe(Array.size, () => {
    test('should return 0 for empty array', () => {
      expect(Array.size([])).toBe(0);
    });
    test('should return element at index', () => {
      expect(Array.size([1, 2, 3])).toBe(3);
    });
  });
  describe(Array.hasInstance, () => {
    test('should return true for Array', () => {
      expect(Array.hasInstance(Array.empty())).toEqual(true);
    });
    test('should return false for any other value', () => {
      expect(Array.hasInstance(null)).toBe(false);
      expect(Array.hasInstance({ length: 0 })).toBe(false);
    });
  });
  describe(Array.isEmpty, () => {
    test('should return true when array is empty', () => {
      expect(Array.isEmpty([])).toEqual(true);
    });
    test('should same instance', () => {
      expect(Array.isEmpty([1])).toBe(false);
    });
  });
  describe(Array.map, () => {
    test('should return unchanged if empty', () => {
      const emptyArray = Array.empty();
      expect(Array.map(emptyArray, (_) => _ * 2)).toBe(emptyArray);
    });
    test('should return same ref when no changed value', () => {
      const array = [1, 2, 3];
      const identity = (_: number) => _;
      expect(Array.map(array, identity)).toBe(array);
    });
    test('should map each value to callback', () => {
      const array = [1, 2, 3];
      const double = (_: number) => _ * 2;
      expect(Array.map(array, double)).toEqual(array.map(double));
    });
  });
  describe(Array.flatMap, () => {
    test('should return unchanged if empty', () => {
      const emptyArray = Array.empty();
      expect(Array.flatMap(emptyArray, (_) => [_ * 2, _ * 3])).toBe(emptyArray);
    });
    test('should call with (item, index, array)', () => {
      const array = ['a', 'b', 'c'];
      const mapFn = jest.fn(() => []);
      Array.flatMap(array, mapFn);
      expect(mapFn).toHaveBeenCalledTimes(3);
      expect(mapFn).toHaveBeenNthCalledWith(1, 'a', 0, array);
      expect(mapFn).toHaveBeenNthCalledWith(2, 'b', 1, array);
      expect(mapFn).toHaveBeenNthCalledWith(3, 'c', 2, array);
    });
    test('should map each value to callback', () => {
      const array = [1, 2, 3];
      const mapFn = (_: number) => [_ * 2, _ * 3];
      expect(Array.flatMap(array, mapFn)).toEqual([2, 3, 4, 6, 6, 9]);
    });
  });
  describe(Array.reduce, () => {
    test('should map each value to callback', () => {
      const array = ['foo', 'bar', 'baz'];
      const concat = (_: string, value: string) => `${_}:${value}`;
      jest.spyOn(array, 'reduce' as any);

      expect(Array.reduce(array, concat, '$')).toEqual('$:foo:bar:baz');
      expect(array.reduce).toHaveBeenLastCalledWith(concat, '$');
    });
  });
  describe(Array.reduceRight, () => {
    test('should map each value to callback', () => {
      const array = ['foo', 'bar', 'baz'];
      const concat = (_: string, value: string) => `${_}:${value}`;
      jest.spyOn(array, 'reduceRight' as any);

      expect(Array.reduceRight(array, concat, '$')).toEqual('$:baz:bar:foo');
      expect(array.reduceRight).toHaveBeenLastCalledWith(concat, '$');
    });
  });
  describe(Array.find, () => {
    test('should map each value to callback', () => {
      const array = ['a', 'b', 'c'];
      jest.spyOn(array, 'find' as any);

      expect(Array.find(array, (_) => _ === 'a')).toEqual('a');
      expect(Array.find(array, (_) => _ === 'non_existent')).toEqual(Option.None);
    });
  });
  describe(Array.findIndex, () => {
    test('should map each value to callback', () => {
      const array = ['a', 'b', 'c'];

      expect(Array.findIndex(array, (_) => _ === 'a')).toEqual(0);
      expect(Array.findIndex(array, (_) => _ === 'non_existent')).toEqual(Option.None);
    });
  });
  describe(Array.indexOf, () => {
    test('should return index of element', () => {
      const array = ['a', '', 'a', '', 'a'];
      expect(Array.indexOf(array, 'a', 1)).toEqual(2);
    });
    test('should work with NaN', () => {
      const array = ['a', Number.NaN, 'a', '', 'a'];

      expect(Array.indexOf(array, Number.NaN)).toEqual(1);
    });
    test('should return Option.None when not found', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.indexOf(array, 'non_existent', 1)).toEqual(Option.None);
    });
  });
  describe(Array.lastIndexOf, () => {
    test('should map each value to callback', () => {
      const array = ['a', '', 'a', '', 'a'];

      expect(Array.lastIndexOf(array, 'a', 1)).toEqual(0);
    });
    test('should work with NaN', () => {
      const array = ['a', Number.NaN, 'a', Number.NaN, 'a'];

      expect(Array.lastIndexOf(array, Number.NaN)).toEqual(3);
    });
    test('should return Option.None when not found', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.lastIndexOf(array, 'non_existent', 1)).toEqual(Option.None);
    });
  });
  describe(Array.includes, () => {
    test('should map each value to callback', () => {
      const array = ['a', '', 'a', '', 'a'];

      expect(Array.includes(array, 'a', 1)).toEqual(true);
      expect(Array.includes(array, 'absent')).toEqual(false);
    });
    test('should work with NaN', () => {
      const array = ['a', Number.NaN, 'a', '', 'a'];

      expect(Array.includes(array, Number.NaN)).toEqual(true);
    });
  });
  describe(Array.filter, () => {
    test('should return unchanged if empty', () => {
      const emptyArray = Array.empty();
      expect(Array.filter(emptyArray, () => true)).toBe(emptyArray);
    });
    test('should return same array if no value changed', () => {
      const array = [1, 2, 3];
      expect(Array.filter(array, () => true)).toBe(array);
    });
    test('should return empty() if always false', () => {
      const array = [1, 2, 3];
      expect(Array.filter(array, () => false)).toBe(Array.empty());
    });
    test('should map each value to callback', () => {
      const array = [1, 2, 3];

      const minOne = (_: number) => _ > 1;
      expect(Array.filter(array, minOne)).toEqual([2, 3].filter(minOne));
    });
  });
  describe(Array.some, () => {
    test('should map each value to callback', () => {
      const array = [1, 2, 3];
      jest.spyOn(array, 'some' as any);

      const eq3 = (_: number) => _ === 3;
      expect(Array.some(array, eq3)).toEqual(true);
      expect(array.some).toHaveBeenLastCalledWith(eq3);
      expect(Array.some([], eq3)).toEqual(false);
    });
  });
  describe(Array.every, () => {
    test('should map each value to callback', () => {
      const array = [1, 2, 3];
      jest.spyOn(array, 'every' as any);

      const isNumber = (_: number) => typeof _ === 'number';
      expect(Array.every(array, isNumber)).toEqual(true);
      expect(array.every).toHaveBeenLastCalledWith(isNumber);
      expect(Array.every([], isNumber)).toEqual(true);
    });
  });
  describe(Array.concat, () => {
    test('should return unchanged if no extension is passed', () => {
      const array = [1, 2, 3];
      expect(Array.concat(array)).toBe(array);
    });
    test('should append values', () => {
      expect(Array.concat([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    test('should return same array when no changes', () => {
      const array = [1, 2];
      expect(Array.concat(array, [])).toBe(array);
    });
  });
  describe(Array.reverse, () => {
    test('should return unchanged if empty', () => {
      const emptyArray = Array.empty();
      expect(Array.reverse(emptyArray)).toBe(emptyArray);
    });
    test('should return same array if no value changed', () => {
      const array = [1, 2, 1];
      expect(Array.reverse(array)).toBe(array);
    });
    test('should map each value to callback', () => {
      const array = [1, 2, 3];
      expect(Array.reverse(array)).toEqual(array.slice().reverse());
    });
  });
  describe(Array.sort, () => {
    test('should return unchanged if empty', () => {
      const emptyArray = Array.empty();
      expect(Array.sort(emptyArray, (left, right) => left - right)).toBe(emptyArray);
    });
    test('should map each value to callback', () => {
      const array = [11, 4, 6, 2];

      expect(Array.sort(array, (left, right) => left - right)).toEqual([2, 4, 6, 11]);
    });
  });
  describe(Array.slice, () => {
    const anyArray = [11, 4, 6, 2];

    test('should return unchanged when empty', () => {
      const empty = Array.empty();
      expect(Array.slice(empty, 0, 1)).toBe(empty);
    });
    test('should return empty if start >= end', () => {
      expect(Array.slice([1, 2, 3], 1, 1)).toBe(Array.empty());
      expect(Array.slice([1, 2, 3], 0, 0)).toBe(Array.empty());
      expect(Array.slice([1, 2, 3], 1, 0)).toBe(Array.empty());
    });
    test.each(
      generate({
        start: [undefined, 0],
        end: [undefined, anyArray.length, anyArray.length + 1],
      })
    )('return unchanged when slice all parameters are nullish or array bounds', ({ start, end }) => {
      expect(Array.slice(anyArray, start, end)).toBe(anyArray);
    });

    test.each(
      generate({
        start: [undefined, 0, 1, -1],
        end: [undefined, -1, 1, anyArray.length - 1, anyArray.length, anyArray.length + 1],
      })
    )('should return same result as array.slice(%p)', ({ start, end }) => {
      expect(Array.slice(anyArray, start, end)).toEqual(anyArray.slice(start ?? undefined, end ?? undefined));
    });
  });
  describe(Array.deleteAt, () => {
    test('should return unchanged when empty', () => {
      const empty = Array.empty();
      expect(Array.deleteAt(empty, 1)).toBe(empty);
    });
    test('should return empty() when only one element is removed', () => {
      const array = [1];
      expect(Array.deleteAt(array, 0)).toBe(Array.empty());
    });
    test('should return unchanged when index is < 0', () => {
      const array = [1, 2, 3];
      expect(Array.deleteAt(array, -1)).toBe(array);
    });
    test('should return unchanged when index is >= array length', () => {
      const array = [1, 2, 3];
      expect(Array.deleteAt(array, 3)).toBe(array);
    });
    test('should return new array without element', () => {
      const array = [1, 2, 3, 4, 5];
      expect(Array.deleteAt(array, 2)).toEqual([1, 2, 4, 5]);
    });
  });
  describe(Array.insertAt, () => {
    test('should return a new array', () => {
      const array = Array.empty<string>();
      expect(Array.insertAt(array, 0, '$')).toEqual(['$']);
    });
    test('should return unchanged when index < 0', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.insertAt(array, -1, '$')).toBe(array);
    });
    test('should return unchanged when index > array.length', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.insertAt(array, array.length + 1, '$')).toBe(array);
    });
    test('should return new array', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.insertAt(array, 0, '$')).toEqual(['$', 'a', 'b', 'c']);
      expect(Array.insertAt(array, 1, '$')).toEqual(['a', '$', 'b', 'c']);
      expect(Array.insertAt(array, 2, '$')).toEqual(['a', 'b', '$', 'c']);
      expect(Array.insertAt(array, 3, '$')).toEqual(['a', 'b', 'c', '$']);
    });
  });
  describe(Array.updateAt, () => {
    test('should return unchanged when index < 0', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.updateAt(array, -1, '$')).toBe(array);
    });
    test('should return unchanged when index > array.length', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.updateAt(array, array.length + 1, '$')).toBe(array);
    });
    test('should return unchanged when value is strict equal', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.updateAt(array, 1, 'b')).toBe(array);
    });
    test('should return new array', () => {
      const array = ['a', 'b', 'c'];
      expect(Array.updateAt(array, 0, '$')).toEqual(['$', 'b', 'c']);
      expect(Array.updateAt(array, 1, '$')).toEqual(['a', '$', 'c']);
      expect(Array.updateAt(array, 2, '$')).toEqual(['a', 'b', '$']);
    });
  });
});
