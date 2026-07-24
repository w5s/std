import { describe, expect, it } from 'vitest';

import { AsyncIterable } from './AsyncIterable.js';
import { chunks } from './AsyncIterable/chunks.js';
import { concat } from './AsyncIterable/concat.js';
import { create } from './AsyncIterable/create.js';
import { drop } from './AsyncIterable/drop.js';
import { empty } from './AsyncIterable/empty.js';
import { every } from './AsyncIterable/every.js';
import { filter } from './AsyncIterable/filter.js';
import { find } from './AsyncIterable/find.js';
import { flatMap } from './AsyncIterable/flatMap.js';
import { generate } from './AsyncIterable/generate.js';
import { hasInstance } from './AsyncIterable/hasInstance.js';
import { map } from './AsyncIterable/map.js';
import { of } from './AsyncIterable/of.js';
import { reduce } from './AsyncIterable/reduce.js';
import { size } from './AsyncIterable/size.js';
import { some } from './AsyncIterable/some.js';
import { take } from './AsyncIterable/take.js';
import { zip } from './AsyncIterable/zip.js';

describe('AsyncIterable', () => {
  it('has alias to methods', () => {
    expect(AsyncIterable).toEqual({
      chunks,
      concat,
      create,
      drop,
      empty,
      every,
      filter,
      find,
      flatMap,
      generate,
      hasInstance,
      map,
      of,
      reduce,
      size,
      some,
      take,
      zip,
    });
  });
});
