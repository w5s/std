import { describe, it, expect } from 'vitest';
import { String } from './String.js';
import { of } from './String/of.js';
import { at } from './String/at.js';
import { isEmpty } from './String/isEmpty.js';
import { size } from './String/size.js';
import { includes } from './String/includes.js';
import { startsWith } from './String/startsWith.js';
import { endsWith } from './String/endsWith.js';
import { concat } from './String/concat.js';
import { split } from './String/split.js';
import { join } from './String/join.js';
import { fromCodePoint } from './String/fromCodePoint.js';
import { indexOf } from './String/indexOf.js';
import { lastIndexOf } from './String/lastIndexOf.js';
import { StringComparable } from './String/StringComparable.js';
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
        fromCodePoint,
        includes,
        indexOf,
        isEmpty,
        join,
        lastIndexOf,
        of,
        size,
        split,
        startsWith,
      }),
    );
  });
});
