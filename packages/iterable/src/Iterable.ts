import { chunks } from './Iterable/chunks.js';
import { concat } from './Iterable/concat.js';
import { create } from './Iterable/create.js';
import { drop } from './Iterable/drop.js';
import { empty } from './Iterable/empty.js';
import { every } from './Iterable/every.js';
import { filter } from './Iterable/filter.js';
import { find } from './Iterable/find.js';
import { flatMap } from './Iterable/flatMap.js';
import { from } from './Iterable/from.js';
import { generate } from './Iterable/generate.js';
import { hasInstance } from './Iterable/hasInstance.js';
import { map } from './Iterable/map.js';
import { of } from './Iterable/of.js';
import { reduce } from './Iterable/reduce.js';
import { size } from './Iterable/size.js';
import { some } from './Iterable/some.js';
import { take } from './Iterable/take.js';
import { zip } from './Iterable/zip.js';

/**
 * A collection of functions to manipulate Iterable
 *
 * @example
 * ```typescript
 * const iterable = Iterable.create(() => ({
 *   next() { ... }
 * }));
 *
 * const iterable = Iterable.create(function* () { ... })
 * ```
 * @namespace
 */
export const Iterable = {
  chunks,
  concat,
  create,
  drop,
  empty,
  every,
  filter,
  find,
  flatMap,
  from,
  generate,
  hasInstance,
  map,
  of,
  reduce,
  size,
  some,
  take,
  zip,
};
