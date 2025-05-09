import { at } from './Array/at.js';
import { concat } from './Array/concat.js';
import { deleteAt } from './Array/deleteAt.js';
import { empty } from './Array/empty.js';
import { every } from './Array/every.js';
import { filter } from './Array/filter.js';
import { find } from './Array/find.js';
import { findIndex } from './Array/findIndex.js';
import { findLast } from './Array/findLast.js';
import { findLastIndex } from './Array/findLastIndex.js';
import { flatMap } from './Array/flatMap.js';
import { fromAsync } from './Array/fromAsync.js';
import { generate } from './Array/generate.js';
import { hasInstance } from './Array/hasInstance.js';
import { includes } from './Array/includes.js';
import { indexOf } from './Array/indexOf.js';
import { insertAt } from './Array/insertAt.js';
import { isEmpty } from './Array/isEmpty.js';
import { lastIndexOf } from './Array/lastIndexOf.js';
import { map } from './Array/map.js';
import { of } from './Array/of.js';
import { reduce } from './Array/reduce.js';
import { reduceRight } from './Array/reduceRight.js';
import { reverse } from './Array/reverse.js';
import { setAt } from './Array/setAt.js';
import { size } from './Array/size.js';
import { slice } from './Array/slice.js';
import { some } from './Array/some.js';
import { sort } from './Array/sort.js';
import { splice } from './Array/splice.js';

export type Array<Item> = ReadonlyArray<Item>;

/**
 * A collection of functions to manipulate readonly arrays.
 *
 * @example
 * ```typescript
 * import { Array } from '@w5s/core';
 *
 * const array = Array.of(2, 1, 3);
 * const reversed = Array.reversed(array);// [3, 1, 2]
 * const sorted = Array.sort(array, (left, right) => left === right ? 0 : left < right ? -1 : 1);// [1, 2, 3]
 * ```
 * @namespace
 */
export const Array = {
  at,
  concat,
  deleteAt,
  empty,
  every,
  filter,
  find,
  findIndex,
  findLast,
  findLastIndex,
  flatMap,
  fromAsync,
  generate,
  hasInstance,
  includes,
  indexOf,
  insertAt,
  isEmpty,
  lastIndexOf,
  map,
  of,
  reduce,
  reduceRight,
  reverse,
  setAt,
  size,
  slice,
  splice,
  some,
  sort,
};
