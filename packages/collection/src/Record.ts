import { $delete } from './Record/delete.js';
import { empty } from './Record/empty.js';
import { entries } from './Record/entries.js';
import { forEach } from './Record/forEach.js';
import { from } from './Record/from.js';
import { get } from './Record/get.js';
import { has } from './Record/has.js';
import { keys } from './Record/keys.js';
import { set } from './Record/set.js';
import { size } from './Record/size.js';
import { values } from './Record/values.js';

export type RecordKey = string | symbol;

/**
 * A Record is an immutable mapping `{ [string]: value }`
 */
export type Record<Key extends RecordKey, Value> = {
  readonly [P in Key]: Value;
};

/**
 * A collection of functions to manipulate Record
 *
 * @namespace
 */
export const Record = {
  delete: $delete,
  empty,
  entries,
  forEach,
  from,
  get,
  has,
  keys,
  set,
  size,
  values,
};
