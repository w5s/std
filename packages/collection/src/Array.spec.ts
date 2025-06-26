import { describe, it, expect } from 'vitest';
import { Array } from './Array.js';
import { at } from './Array/at.js';
import { concat } from './Array/concat.js';
import { deleteAt } from './Array/deleteAt.js';
import { empty } from './Array/empty.js';
import { every } from './Array/every.js';
import { find } from './Array/find.js';
import { filter } from './Array/filter.js';
import { findIndex } from './Array/findIndex.js';
import { flatMap } from './Array/flatMap.js';
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
import { findLast } from './Array/findLast.js';
import { findLastIndex } from './Array/findLastIndex.js';
import { fromAsync } from './Array/fromAsync.js';

describe('Array', () => {
  it('is an alias to functions', () => {
    expect(Array).toEqual({
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
    });
  });
});
