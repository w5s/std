/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/no-for-loop */
import type { Int } from './integer.js';
import type { Option } from './option.js';

const globalObject =
  typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : (undefined as never);

const NativeArray = globalObject.Array;
type NativeArray<T> = globalThis.Array<T>;
type UnsafeArray = any;

export type Array<Item> = ReadonlyArray<Item>;
export namespace Array {
  const copy = <Item>(array: ReadonlyArray<Item>): NativeArray<Item> => array.slice();
  const emptyArray = Object.freeze([]);
  const readonly = <Item>(array: NativeArray<Item>): ReadonlyArray<Item> => array;
  const none = undefined;
  const isBetween = (value: number, min: number, max: number) => value >= min && value <= max;
  const copySlice = <Item>(
    array: NativeArray<Item>,
    arrayStartIndex: number,
    source: ReadonlyArray<Item>,
    sourceFromIndex: number,
    sourceToIndex: number
  ) => {
    let arrayIndex = arrayStartIndex;
    for (let sourceIndex = sourceFromIndex; sourceIndex < sourceToIndex; sourceIndex += 1) {
      array[arrayIndex] = source[sourceIndex]!;
      arrayIndex += 1;
    }
  };

  /**
   * Alias to `Array.isArray()`
   *
   * @example
   * ```typescript
   * Array.hasInstance(Array.empty()) // true
   * Array.hasInstance(null)) // false
   * ```
   * @category Guard
   * @param anyValue a tested value
   */
  export function hasInstance(anyValue: unknown): anyValue is Array<unknown> {
    return NativeArray.isArray(anyValue);
  }

  /**
   * Always returns an empty array
   *
   * @example
   * ```typescript
   * Array.empty() // []
   * ```
   * @category Constructor
   */
  export function empty<Item = never>(): Array<Item> {
    return emptyArray;
  }

  /**
   * Returns a new array from a set of items.
   *
   * @example
   * ```typescript
   * Array.of(1, 2, 3);// [1, 2, 3]
   * ```
   * @category Constructor
   * @param items A set of items to include in the new array object.
   */
  export function of<Item>(...items: Item[]): Array<Item> {
    return readonly(items);
  }

  /**
   * Creates an array from an iterable object.
   *
   * @param array The array object
   * @param iterable An iterable object to convert to an array.
   */
  // export function from<Item>(iterable: Iterable<Item> | ArrayLike<Item>): Array<Item>;
  /**
   * Creates an array from an iterable object.
   *
   * @param array The array object
   * @param iterable An iterable object to convert to an array.
   * @param mapFn A mapping function to call on every element of the array.
   */
  // export function from<ItemFrom, ItemTo>(
  //   iterable: Iterable<ItemFrom> | ArrayLike<ItemFrom>,
  //   mapFn: (item: ItemFrom, index: Int) => ItemTo
  // ): Array<ItemTo>;
  // export function from(iterable: Iterable<unknown> | ArrayLike<unknown>, mapFn?: any) {
  //   return readonly(NativeArray.from(iterable, mapFn));
  // }

  /**
   * Return true if the size of the array is 0
   *
   * @category Guard
   * @param array The array object
   */
  export function isEmpty(array: ArrayLike<unknown>): boolean {
    return array.length === 0;
  }

  /**
   * Return an item at the `index` position
   *
   * @example
   * ```typescript
   * const array = ['foo', 'bar', 'baz'];
   * Array.at(array, 1) // Option.Some('bar')
   * Array.at(array, -1) //  Option.Some('baz') i.e. the last
   * Array.at(array, 99) // Option.None
   * ```
   * @category Accessor
   * @param array The array object
   * @param index The zero based position
   */
  export function at<Item>(array: ArrayLike<Item>, index: number): Option<Item> {
    const arrayIndex = index < 0 ? index + array.length : index;

    return array[arrayIndex];
  }

  /**
   * Return the length of the array
   *
   * @example
   * ```typescript
   * Array.size([]) // 0
   * Array.size(['foo', 'bar']) // 2
   * ```
   * @category Accessor
   * @param array The array object
   */
  export function size(array: ArrayLike<unknown>): Int {
    return array.length as Int;
  }

  /**
   * Returns the index of the first occurrence of `searchItem` in an array.
   *
   * @example
   * ```typescript
   * Array.indexOf(['a', '', 'a'], 'a'); // 0
   * Array.indexOf(['a', '', 'a',  '', 'a'], 'a', 1); // 2
   * Array.indexOf(['a', 'b'], 'absent'); // -1
   * ```
   * @param array The array object
   * @param searchItem The item to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  export function indexOf<Item>(array: Array<Item>, searchItem: Item, fromIndex?: number): Option<Int> {
    const returnValue = none;
    const arrayLength = array.length;

    if (arrayLength > 0) {
      let index = fromIndex == null ? 0 : fromIndex < 0 ? Math.max(arrayLength + fromIndex, 0) : fromIndex;

      // eslint-disable-next-line no-self-compare
      if (searchItem === searchItem) {
        // not NaN
        while (index < arrayLength) {
          if (array[index] === searchItem) {
            return index as Int;
          }

          index += 1;
        }
      } else {
        // NaN
        while (index < arrayLength) {
          const value = array[index];
          // eslint-disable-next-line no-self-compare
          if (value !== value) {
            return index as Int;
          }

          index += 1;
        }
      }
    }

    return returnValue;
  }

  /**
   * Returns the index of the last occurrence of a specified `searchItem` in an array.
   *
   * @example
   * ```typescript
   * Array.lastIndexOf(['a', 'b', 'a'], 'a') // 2
   * Array.lastIndexOf(['a', 'b', 'a', 'b', 'a'], 'a', 4); // 2
   * Array.lastIndexOf(['a', 'b'], 'absent') // -1
   * ```
   * @param array The array object
   * @param searchItem The item to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index of the array.
   */
  export function lastIndexOf<Item>(array: Array<Item>, searchItem: Item, fromIndex?: number): Option<Int> {
    const returnValue = none;
    const arrayLength = array.length;

    if (arrayLength > 0) {
      let index =
        fromIndex == null
          ? arrayLength - 1
          : fromIndex < 0
          ? Math.max(arrayLength + fromIndex, 0)
          : Math.min(fromIndex, arrayLength - 1);

      // eslint-disable-next-line no-self-compare
      if (searchItem === searchItem) {
        // not NaN
        while (index >= 0) {
          if (array[index] === searchItem) {
            return index as Int;
          }

          index -= 1;
        }
      } else {
        // NaN
        while (index >= 0) {
          const value = array[index];
          // eslint-disable-next-line no-self-compare
          if (value !== value) {
            return index as Int;
          }

          index -= 1;
        }
      }
    }

    return returnValue;
  }

  /**
   * Determines whether an array includes a certain item, returning true or false as appropriate.
   *
   * @example
   * ```typescript
   * Array.includes(['a', '', 'a'], 'a'); // true
   * Array.includes(['a', '', 'a',  '', 'a'], 'a', 1); // true
   * Array.includes(['a', 'b'], 'absent'); // false
   * ```
   * @param array The array object
   * @param searchItem The item to search for.
   * @param fromIndex The position in this array at which to begin searching for searchItem.
   */
  export function includes<Item>(array: Array<Item>, searchItem: Item, fromIndex?: number): boolean {
    return indexOf(array, searchItem, fromIndex) !== none;
  }

  // export function forEach() {}

  /**
   * Calls a defined callback function on each item of an array, and returns an array that contains the results.
   *
   * @example
   * ```typescript
   * const array = [1, 2, 3];
   * const double = (_: number) => _ * 2;
   * Array.map(array, double); // [2, 4, 6]
   * ```
   * @param array The array object
   * @param mapFn A function that accepts up to three arguments. The map method calls the function one time for each item in the array.
   */
  export function map<FromItem, ToItem>(
    array: Array<FromItem>,
    mapFn: (item: FromItem, index: Int, array: Array<FromItem>) => ToItem
  ): Array<ToItem> {
    const arrayLength = array.length;

    if (arrayLength === 0) {
      return array as Array<never>;
    }
    let index = 0;
    let changed = false;
    const returnValue = new NativeArray(arrayLength);

    // 1. map and check changes
    while (index < arrayLength) {
      const previousValue = array[index]!;
      const nextValue = mapFn(previousValue, index as Int, array);
      returnValue[index] = nextValue;
      index += 1;
      if ((nextValue as any) !== previousValue) {
        changed = true;
        break;
      }
    }
    // 2. map all rest values
    while (index < arrayLength) {
      returnValue[index] = mapFn(array[index]!, index as Int, array);
      index += 1;
    }

    return changed ? readonly(returnValue) : array;
  }

  /**
   * Calls a defined callback function on each item of an array. Each calls should return an array.
   * The final result is the concatenation of each arrays.
   *
   * @example
   * ```typescript
   * const array = ['a', 'b', 'c'];
   * const concat = (_: string) => [_ + '_1', _ + '_2'];
   * Array.flatMap(array, concat); // ['a_1', 'a_2', 'b_1', 'b_2', 'c_1', 'c_2']
   * ```
   * @param array The array object
   * @param mapFn A function that accepts up to three arguments. The map method calls the function one time for each item in the array and returns an array that will be concatenated.
   */
  export function flatMap<FromItem, ToItem>(
    array: Array<FromItem>,
    mapFn: (item: FromItem, index: Int, array: Array<FromItem>) => Array<ToItem>
  ): Array<ToItem> {
    const arrayLength = array.length;
    if (arrayLength === 0) {
      return array as Array<never>;
    }
    const returnValue: NativeArray<ToItem> = [];
    let returnValueIndex = 0;
    let index = 0;

    while (index < arrayLength) {
      const part = mapFn(array[index]!, index as Int, array);
      const partLength = part.length;
      copySlice(returnValue, returnValueIndex, part, 0, partLength);
      returnValueIndex += partLength;
      index += 1;
    }

    return readonly(returnValue);
  }

  /**
   * Calls the specified callback function for all the items in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   *
   * @example
   * ```typescript
   * const array = ['foo', 'bar', 'baz'];
   * const concat = (_: string, item: string) => _ + ':' + item;
   * Array.reduce(array, concat, '$') // '$foo:bar:baz'
   * ```
   * @param array The array object
   * @param reduceFn A function that accepts up to four arguments. The reduce method calls the function one time for each item in the array.
   * @param initialValue Initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  export function reduce<Item, ReturnValue>(
    array: Array<Item>,
    reduceFn: (previousValue: ReturnValue, currentItem: Item, currentIndex: Int, array: Array<Item>) => ReturnValue,
    initialValue: ReturnValue
  ): ReturnValue {
    return (array as UnsafeArray).reduce(reduceFn, initialValue);
  }

  /**
   * Calls the specified callback function for all the items in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   *
   * @example
   * ```typescript
   * const array = ['foo', 'bar', 'baz'];
   * const concat = (_: string, item: string) => _ + ':' + item;
   * Array.reduceRight(array, concat, '$') // '$baz:bar:foo'
   * ```
   * @param array The array object
   * @param reduceFn A function that accepts up to four arguments. The reduce method calls the function one time for each item in the array.
   * @param initialValue Initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  export function reduceRight<Item, ReturnValue>(
    array: Array<Item>,
    reduceFn: (previousValue: ReturnValue, currentItem: Item, currentIndex: Int, array: Array<Item>) => ReturnValue,
    initialValue: ReturnValue
  ): ReturnValue {
    return (array as UnsafeArray).reduceRight(reduceFn, initialValue);
  }

  /**
   * Returns the items of an array that meet the condition specified in a callback function.
   *
   * @example
   * ```typescript
   * const array = [1, 2, 3, 4];
   * const isEven = (_: number) => _ % 2 === 0;
   * Array.filter(array, isEven); // [2, 4]
   * ```
   * @param array The array object
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each item in the array.
   */
  export function filter<Item, RefinedItem extends Item>(
    array: Array<Item>,
    predicate: (item: Item) => item is RefinedItem
  ): Array<RefinedItem>;
  export function filter<Item>(
    array: Array<Item>,
    predicate: (item: Item, index: Int, array: Array<Item>) => boolean
  ): Array<Item>;
  export function filter<Item>(array: Array<Item>, predicate: (item: Item, index: Int, array: Array<Item>) => boolean) {
    const arrayLength = array.length;
    if (arrayLength === 0) {
      return array;
    }

    const returnValue = [];
    let returnIndex = 0;
    let index = 0;
    while (index < arrayLength) {
      const value = array[index];
      if (predicate(array[index]!, index as Int, array)) {
        returnValue[returnIndex] = value;
        returnIndex += 1;
      }
      index += 1;
    }
    const returnValueLength = returnValue.length;

    return returnValueLength === 0 ? emptyArray : returnValueLength === arrayLength ? array : readonly(returnValue);
  }

  /**
   * Determines whether the specified callback function returns true for any item of an array.
   *
   * @example
   * ```typescript
   * const isEven = (_: number) => _ % 2 === 0;
   * Array.some([1, 2, 3], isEven); // true
   * Array.some([1, 3], isEven); // false
   * Array.some([], (value) => true); // false
   * ```
   * @param array The array object
   * @param predicate The predicate function is called until it returns `true`, or until the end of the array.
   */
  export function some<Item>(
    array: Array<Item>,
    predicate: (item: Item, index: Int, array: Array<Item>) => boolean
  ): boolean {
    return (array as UnsafeArray).some(predicate);
  }

  /**
   * Determines whether all the members of an array satisfy the specified test.
   *
   * @example
   * ```typescript
   * const isEven = (_: number) => _ % 2 === 0;
   * Array.every([1, 2, 3], isEven); // false
   * Array.every([2, 4], isEven); // true
   * Array.every([], (value) => false); // true
   * ```
   * @param array The array object
   * @param predicate The predicate function is called until it returns `false`, or until the end of the array.
   */
  export function every<Item, RefinedItem extends Item>(
    array: Array<Item>,
    predicate: (item: Item, index: Int, array: Array<Item>) => item is RefinedItem
  ): array is Array<RefinedItem>;
  export function every<Item>(
    array: Array<Item>,
    predicate: (item: Item, index: Int, array: Array<Item>) => boolean
  ): boolean;
  export function every<Item>(
    array: Array<Item>,
    predicate: (item: Item, index: Int, array: Array<Item>) => boolean
  ): boolean {
    return (array as UnsafeArray).every(predicate);
  }

  /**
   * Returns the value of the first element in the array where predicate is true, and Option.None
   * otherwise.
   *
   * @example
   * ```typescript
   * Array.find(['aa', 'ab', 'abc'], (value) => (value[1] === 'b'));// Option.Some('ab')
   * Array.find(['a', 'b', 'a'], (value) => false);// Option.None
   * ```
   * @param array The array object
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, find
   * immediately returns that element value. Otherwise, find returns Option.None.
   */
  export function find<Item, RefinedItem extends Item>(
    array: Array<Item>,
    predicate: (value: Item, index: Int, array: Array<Item>) => value is RefinedItem
  ): Option<RefinedItem>;
  export function find<Item>(
    array: Array<Item>,
    predicate: (value: Item, index: Int, array: Array<Item>) => boolean
  ): Option<Item>;
  export function find<Item>(array: Array<Item>, predicate: (value: Item, index: Int, array: Array<Item>) => boolean) {
    return (array as UnsafeArray).find(predicate);
  }
  /**
   * Returns the index of the first element in the array where predicate is true, and Option.None
   * otherwise.
   *
   * @example
   * ```typescript
   * Array.findIndex(['a', 'b', 'a'], (value) => (value === 'a'));// Option.Some(0)
   * Array.findIndex(['a', 'b', 'a'], (value) => false);// Option.None
   * ```
   * @param array The array object
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, find
   * immediately returns that element value. Otherwise, find returns Option.None.
   */
  export function findIndex<Item>(
    array: Array<Item>,
    predicate: (value: Item, index: Int, array: Array<Item>) => boolean
  ): Option<Int> {
    const returnValue = none;
    const arrayLength = array.length;

    if (arrayLength > 0) {
      let index = 0;

      while (index < arrayLength) {
        if (predicate(array[index]!, index as Int, array)) {
          return index as Int;
        }

        index += 1;
      }
    }

    return returnValue;
  }

  /**
   * Return a sorted array using `compareFn`
   *
   * @example
   * ```typescript
   * Array.sort([11, 2, 22, 1], (a, b) => a - b);// [1, 2, 11, 22]
   * ```
   * @param array The array object
   * @param compareFn Function used to determine the order of the items. It is expected to return
   * a negative value if first argument is less than second argument, zero if they're equal and a positive
   * value otherwise.
   */
  export function sort<Item>(array: Array<Item>, compareFn: (a: Item, b: Item) => number) {
    if (array.length === 0) {
      return array;
    }

    return readonly(copy(array).sort(compareFn));
  }

  /**
   * Returns a section of an array.
   *
   * @example
   * ```typescript
   * Array.sort([1, 2, 3, 4], 1, 3);// [2, 3]
   * ```
   * @param array The array object
   * @param start The beginning of the specified portion of the array.
   * @param end The end of the specified portion of the array. This is exclusive of the item at the index `end`.
   */
  export function slice<Item>(array: Array<Item>, start?: Option<number>, end?: Option<number>): Array<Item> {
    const arrayLength = array.length;
    if (arrayLength === 0) {
      return array;
    }
    const startIndex = start == null ? 0 : start;
    const endIndex = end == null ? arrayLength : end > arrayLength ? arrayLength : end;

    const startNormalized =
      (startIndex < 0 ? (-startIndex > arrayLength ? 0 : arrayLength + startIndex) : startIndex) >>> 0;
    const endNormalized = endIndex < 0 ? endIndex + arrayLength : endIndex;
    const sliceLength = startNormalized > endNormalized ? 0 : (endNormalized - startNormalized) >>> 0;
    // start >>>= 0;

    if (sliceLength === 0) {
      return emptyArray;
    }
    if (sliceLength === arrayLength) {
      return array;
    }

    const result = new NativeArray(sliceLength);
    copySlice(result, 0, array, startNormalized, endNormalized);

    return readonly(result);
  }

  /**
   * Concatenate all elements of arrays
   * Equivalent to `[...array, ...extension[0], ...extension[1], ...]`,
   *
   * @example
   * ```typescript
   * Array.concat([1, 2], [3, 4], [5, 6]);// [1, 2, 3, 4, 5, 6]
   * ```
   * @param array The array object
   * @param extensions The other arrays to append
   */
  export function concat<Item>(array: Array<Item>, ...extensions: Array<Item>[]): Array<Item> {
    const extensionsLength = extensions.length;
    if (extensionsLength > 0) {
      const arrayLength = array.length;
      let returnValue: NativeArray<Item> | undefined;
      for (let extensionIndex = 0; extensionIndex < extensionsLength; extensionIndex += 1) {
        const extension = extensions[extensionIndex]!;
        const extensionLength = extension.length;
        if (extensionLength > 0) {
          if (returnValue === undefined) {
            returnValue = [];
            copySlice(returnValue, returnValue.length, array, 0, arrayLength);
          }
          copySlice(returnValue, returnValue.length, extension, 0, extensionLength);
        }
      }

      return returnValue === undefined ? array : readonly(returnValue);
    }

    return array;
  }

  /**
   * Return a reversed array
   *
   * @example
   * ```typescript
   * Array.reverse([1, 2, 3]);// [3, 2, 1]
   * ```
   * @param array The array object
   */
  export function reverse<Item>(array: Array<Item>): Array<Item> {
    return map(array, reverseFunction);
  }
  function reverseFunction<Item>(_: Item, index: Int, array: Array<Item>) {
    return array[array.length - 1 - index]!;
  }

  // export function* keys() {
  //   yield 0;
  // }

  // export function* values() {
  //   yield 0;
  // }

  // export function* entries() {
  //   yield 0;
  // }

  /**
   * Add `item` at the `index` in the array
   *
   * @example
   * ```typescript
   * Array.insertAt(['a', 'b', 'c'], 1, '$');// ['a', '$', 'b', 'c']
   * ```
   * @param array The array object
   * @param index The position of the inserted item in the array
   * @param item The item to insert
   */
  export function insertAt<Item>(array: Array<Item>, index: number, item: Item): Array<Item> {
    const arrayLength = array.length;
    const arrayIndex = index;
    if (!isBetween(arrayIndex, 0, arrayLength)) {
      return array;
    }
    const returnValue = new NativeArray<Item>(arrayLength + 1);

    // Copy before index
    copySlice(returnValue, 0, array, 0, index);
    // Add at the index
    returnValue[index] = item;
    // Copy after index
    copySlice(returnValue, index + 1, array, index, arrayLength);

    return readonly(returnValue);
  }

  /**
   * Replace `item` at the `index` in the array
   *
   * @example
   * ```typescript
   * Array.updateAt(['a', 'b', 'c'], 1, '$');// ['a', '$', 'c']
   * ```
   * @param array The array object
   * @param index The position of the updated item in the array
   * @param item The item to insert
   */
  export function updateAt<Item>(array: Array<Item>, index: number, item: Item): Array<Item> {
    const arrayLength = array.length;
    if (arrayLength === 0 || !isBetween(index, 0, arrayLength - 1) || array[index] === item) {
      return array;
    }

    const returnValue = new NativeArray<Item>(arrayLength);

    // Copy before index
    copySlice(returnValue, 0, array, 0, index);
    // Set at the index
    returnValue[index] = item;
    // Copy after index
    copySlice(returnValue, index + 1, array, index + 1, arrayLength);

    return readonly(returnValue);
  }

  /**
   * Return an array excluding the item at the `index`
   *
   * @example
   * ```typescript
   * Array.deletedAt([1, 2, 3, 4], 1);// [1, 3, 4]
   * ```
   * @param array The array object
   * @param index The position of the deleted item in the array
   */
  export function deleteAt<Item>(array: Array<Item>, index: number): Array<Item> {
    const arrayLength = array.length;
    const arrayIndex = index;
    if (arrayLength === 0 || !isBetween(arrayIndex, 0, arrayLength - 1)) {
      return array;
    }
    const returnValueLength = arrayLength - 1;
    if (returnValueLength === 0) {
      return emptyArray;
    }
    const returnValue = new NativeArray<Item>(returnValueLength);

    // Copy before index
    copySlice(returnValue, 0, array, 0, index);
    // Skip the index after index
    copySlice(returnValue, index, array, index + 1, arrayLength);

    return readonly(returnValue);
  }
}
