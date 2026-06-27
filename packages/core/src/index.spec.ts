/* eslint-disable ts/no-unused-vars */
import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Std))).toEqual(
      new Set([
        'Boolean',
        'Callable',
        'Char',
        'Codec',
        'CodecError',
        'Comparable',
        'Struct',
        'Equal',
        'Enum',
        'identity',
        'ignore',
        'Indexable',
        'Int',
        'JSON',
        'lazy',
        'omit',
        'Option',
        'Order',
        'Ordering',
        'pick',
        'Ref',
        'Result',
        'String',
        'Symbol',
        'Tag',
        'Type',
      ]),
    );
  });

  it('exports types', () => {
    type Bounded = Std.Bounded<any>;
    type Numeric = Std.Numeric.Add<any>;

    expect(true).toBe(true);
  });
});
