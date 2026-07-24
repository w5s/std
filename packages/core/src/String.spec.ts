import { describe, expect, it } from 'vitest';

import { String } from './String.js';
import { at } from './String/at.js';
import { concat } from './String/concat.js';
import { endsWith } from './String/endsWith.js';
import { includes } from './String/includes.js';
import { indexOf } from './String/indexOf.js';
import { isEmpty } from './String/isEmpty.js';
import { join } from './String/join.js';
import { lastIndexOf } from './String/lastIndexOf.js';
import { of } from './String/of.js';
import { padEnd } from './String/padEnd.js';
import { padStart } from './String/padStart.js';
import { size } from './String/size.js';
import { split } from './String/split.js';
import { startsWith } from './String/startsWith.js';
import { StringComparable } from './String/StringComparable.js';
import { truncate } from './String/truncate.js';
import { Type } from './Type.js';

describe('String', () => {
  it('is an alias to functions', () => {
    expect(String).toEqual(expect.objectContaining(StringComparable));
    expect(String).toEqual(expect.objectContaining(Type.string));
    expect(String).toEqual(
      expect.objectContaining({
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
        padStart,
        size,
        split,
        startsWith,
        truncate,
      }),
    );
  });
});
