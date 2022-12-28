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
        'Comparable',
        'Console',
        'DataObject',
        'DataError',
        'Disposable',
        'Equal',
        'extend',
        'Int',
        'identity',
        'ignore',
        'invariant',
        'Iterable',
        'JSON',
        'Option',
        'pipe',
        'Random',
        'Record',
        'Ref',
        'Result',
        'shallowEqual',
        'String',
        'Symbol',
        'throwError',
        'Task',
        'TaskCanceler',
        'Time',
        'TimeDuration',
        'warning',
      ].sort()
    );
  });
});
