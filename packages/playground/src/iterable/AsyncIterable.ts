import { of } from './AsyncIterable/of.js';
import { filter } from './AsyncIterable/filter.js';
import { map } from './AsyncIterable/map.js';
import { zip } from './AsyncIterable/zip.js';
import { create } from './AsyncIterable/create.js';
import { reduce } from './AsyncIterable/reduce.js';
import { generate } from './AsyncIterable/generate.js';
import { hasInstance } from './AsyncIterable/hasInstance.js';
import { empty } from './AsyncIterable/empty.js';

/**
 * @namespace
 */
export const AsyncIterable = {
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
