import { of } from './Iterable/of.js';
import { filter } from './Iterable/filter.js';
import { map } from './Iterable/map.js';
import { zip } from './Iterable/zip.js';
import { create } from './Iterable/create.js';
import { reduce } from './Iterable/reduce.js';
import { generate } from './Iterable/generate.js';
import { hasInstance } from './Iterable/hasInstance.js';
import { empty } from './Iterable/empty.js';

/**
 * A collection of functions to manipulate Iterable
 *
 * @example
 * ```ts
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
  filter,
  generate,
  hasInstance,
  map,
  of,
  reduce,
  zip,
};
