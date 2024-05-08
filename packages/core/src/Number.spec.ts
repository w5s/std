import { describe, it, expect } from 'vitest';
import { Number } from './Number.js';
import { describeComparable, describeNumeric, describeType } from './testing.js';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';

describe('Number', () => {
  it('is an alias to functions', () => {
    expect(Number).toEqual(
      expect.objectContaining({
        parse,
        format,
      })
    );
  });
  describeType({ describe, it, expect })(Number, {
    typeName: 'Number',
    instances: () => [0, -1, globalThis.Number.NaN],
    notInstances: () => ['', null, undefined],
  });
  describeComparable({ describe, it, expect })(Number, {
    ordered: () => [-1, 0, 1],
    equivalent: () => [
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
  });
  describeNumeric({ describe, it, expect })(Number, {
    abs: [
      { call: [-1], returns: 1 },
      { call: [0], returns: 0 },
      { call: [1], returns: 1 },
    ],
    sign: [
      { call: [-6], returns: -1 },
      { call: [0], returns: 0 },
      { call: [6], returns: 1 },
    ],
    '+': [
      { call: [1, 1], returns: 2 },
      { call: [1, -1], returns: 0 },
    ],
    '-': [
      { call: [1, 1], returns: 0 },
      { call: [1, -1], returns: 2 },
    ],
    '*': [
      { call: [1, 1], returns: 1 },
      { call: [2, 3], returns: 6 },
      { call: [3, 2], returns: 6 },
    ],
  });
  describe('.minValue', () => {
    it('should be Number.MIN_VALUE', () => {
      expect(Number.minValue).toBe(globalThis.Number.MIN_VALUE);
    });
  });
  describe('.maxValue', () => {
    it('should be Number.MAX_VALUE', () => {
      expect(Number.maxValue).toBe(globalThis.Number.MAX_VALUE);
    });
  });
});
