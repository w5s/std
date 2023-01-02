import { describe, it, expect } from '@jest/globals';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'AggregateError',
        'ArgumentError',
        'Array',
        'assertNever',
        'assertType',
        'assign',
        'AsyncDisposable',
        'Comparable',
        'Console',
        'constant',
        'DataError',
        'DataObject',
        'Disposable',
        'Equal',
        'extend',
        'globalStorage',
        'identity',
        'ignore',
        'Int',
        'invariant',
        'Iterable',
        'JSON',
        'Math',
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
