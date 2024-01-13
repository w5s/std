/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'Array',
        'assign',
        'AsyncDisposable',
        'BigInt',
        'Boolean',
        'cancel',
        'Comparable',
        'Console',
        'DataObject',
        'Disposable',
        'Equal',
        'extend',
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
        'shallowEqual',
        'String',
        'Symbol',
        'Task',
        'throwError',
        'unsafeRun',
        'unsafeRunOk',
      ].sort()
    );
  });

  it('exports types', () => {
    type Bounded = Std.Bounded<any>;
    type Numeric = Std.Numeric<any>;

    expect(true).toBe(true);
  });
});
