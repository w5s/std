/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'Array',
        'BigInt',
        'Boolean',
        'Codec',
        'Comparable',
        'Console',
        'DecodeError',
        'Struct',
        'Equal',
        'Enum',
        'identity',
        'ignore',
        'Int',
        'JSON',
        'lazy',
        'Number',
        'Option',
        'Record',
        'Ref',
        'Result',
        'String',
        'Symbol',
        'Tag',
        'Type',
        'Task',
      ].sort()
    );
  });

  it('exports types', () => {
    type Bounded = Std.Bounded<any>;
    type Numeric = Std.Numeric<any>;

    expect(true).toBe(true);
  });
});
