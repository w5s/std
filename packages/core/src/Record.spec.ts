import { describe, it, expect } from 'vitest';
import { Record } from './Record.js';
import { empty } from './Record/empty.js';
import { from } from './Record/from.js';
import { keys } from './Record/keys.js';
import { size } from './Record/size.js';
import { has } from './Record/has.js';
import { set } from './Record/set.js';
import { forEach } from './Record/forEach.js';
import { values } from './Record/values.js';
import { entries } from './Record/entries.js';
import { get } from './Record/get.js';
import { $delete } from './Record/delete.js';

describe('Record', () => {
  it('is an alias to functions', () => {
    expect(Record).toEqual({
      empty,
      entries,
      forEach,
      from,
      has,
      get,
      keys,
      set,
      size,
      values,
      delete: $delete,
    });
  });
});
