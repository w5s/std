import { describe, expect, it } from 'vitest';

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
        'Enum',
        'Equal',
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
        'Struct',
        'Symbol',
        'Tag',
        'Type',
      ]),
    );
  });

  it('exports types', () => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    type Bounded = Std.Bounded<any>;
    // eslint-disable-next-line unused-imports/no-unused-vars
    type Numeric = Std.Numeric.Add<any>;

    expect(true).toBe(true);
  });
});
