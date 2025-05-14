import { string as StringType } from './Type/string.js';
import { of } from './String/of.js';
import { at } from './String/at.js';
import { isEmpty } from './String/isEmpty.js';
import { StringComparable } from './String/StringComparable.js';
import { size } from './String/size.js';
import { includes } from './String/includes.js';
import { startsWith } from './String/startsWith.js';
import { endsWith } from './String/endsWith.js';
import { concat } from './String/concat.js';
import { split } from './String/split.js';
import { join } from './String/join.js';
import { indexOf } from './String/indexOf.js';
import { lastIndexOf } from './String/lastIndexOf.js';
import { padEnd } from './String/padEnd.js';

/**
 * A collection of functions to manipulate `string`
 *
 * @namespace
 */
export const String = {
  ...StringType,
  ...StringComparable,
  at,
  concat,
  endsWith,
  includes,
  indexOf,
  isEmpty,
  join,
  lastIndexOf,
  of,
  padEnd,
  size,
  split,
  startsWith,
};
