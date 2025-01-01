import { of } from './Iterable/of.js';
import { filter } from './Iterable/filter.js';
import { map } from './Iterable/map.js';
import { zip } from './Iterable/zip.js';
import { create } from './Iterable/create.js';
import { reduce } from './Iterable/reduce.js';
import { generate } from './Iterable/generate.js';
import { hasInstance } from './Iterable/hasInstance.js';
import { empty } from './Iterable/empty.js';
import { some } from './Iterable/some.js';
import { every } from './Iterable/every.js';
import { flatMap } from './Iterable/flatMap.js';
import { size } from './Iterable/size.js';
import { find } from './Iterable/find.js';

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
};
