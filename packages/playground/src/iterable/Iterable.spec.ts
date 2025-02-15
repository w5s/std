import { describe, it, expect } from 'vitest';
import { Iterable } from './Iterable.js';
import { create } from './Iterable/create.js';
import { empty } from './Iterable/empty.js';
import { filter } from './Iterable/filter.js';
import { generate } from './Iterable/generate.js';
import { hasInstance } from './Iterable/hasInstance.js';
import { map } from './Iterable/map.js';
import { of } from './Iterable/of.js';
import { reduce } from './Iterable/reduce.js';
import { zip } from './Iterable/zip.js';
import { every } from './Iterable/every.js';
import { some } from './Iterable/some.js';
import { flatMap } from './Iterable/flatMap.js';
import { size } from './Iterable/size.js';
import { find } from './Iterable/find.js';

describe('Iterable', () => {
  it('has alias to methods', () => {
    expect(Iterable).toEqual({
      create,
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
      zip,
    });
  });
});
