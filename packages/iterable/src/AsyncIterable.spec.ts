import { describe, it, expect } from 'vitest';
import { AsyncIterable } from './AsyncIterable.js';
import { create } from './AsyncIterable/create.js';
import { empty } from './AsyncIterable/empty.js';
import { filter } from './AsyncIterable/filter.js';
import { generate } from './AsyncIterable/generate.js';
import { hasInstance } from './AsyncIterable/hasInstance.js';
import { map } from './AsyncIterable/map.js';
import { of } from './AsyncIterable/of.js';
import { reduce } from './AsyncIterable/reduce.js';
import { zip } from './AsyncIterable/zip.js';
import { every } from './AsyncIterable/every.js';
import { some } from './AsyncIterable/some.js';
import { flatMap } from './AsyncIterable/flatMap.js';
import { size } from './AsyncIterable/size.js';
import { find } from './AsyncIterable/find.js';
import { drop } from './AsyncIterable/drop.js';
import { take } from './AsyncIterable/take.js';
import { chunks } from './AsyncIterable/chunks.js';

describe('AsyncIterable', () => {
  it('has alias to methods', () => {
    expect(AsyncIterable).toEqual({
      chunks,
      create,
      drop,
      empty,
      every,
      find,
      filter,
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
