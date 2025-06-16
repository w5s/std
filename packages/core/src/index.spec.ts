/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'Array',
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
        'Number',
        'Option',
        'Order',
        'Ordering',
        'Record',
        'Ref',
        'Result',
        'String',
        'Symbol',
        'Tag',
        'Type',
      ].sort(),
    );
  });

  it('exports types', () => {
    type Bounded = Std.Bounded<any>;
    type Numeric = Std.Numeric.Add<any>;

    expect(true).toBe(true);
  });
});
