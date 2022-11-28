import { describe, it, expect } from '@jest/globals';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'Math',
        'Array',
        'AggregateError',
        'ArgumentError',
        'AsyncDisposable',
        'assertNever',
        'assertType',
        'assign',
        'constant',
        'Console',
        'DataObject',
        'DataError',
        'Disposable',
        'extend',
        'default', // FIXME: no key exist in reality
        'Int',
        'identity',
        'ignore',
        'invariant',
        'Iterable',
        'JSON',
        'Option',
        'pipe',
        'Ref',
        'Random',
        'Record',
        'Result',
        'String',
        'Symbol',
        'throwError',
        'Task',
        'Time',
        'TimeDuration',
        'warning',
      ].sort()
    );
  });
});
