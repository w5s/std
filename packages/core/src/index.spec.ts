import { describe, it, expect } from 'vitest';
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
        'Canceler',
        'Comparable',
        'Console',
        'constant',
        'DataError',
        'DataObject',
        'Disposable',
        'Equal',
        'extend',
        'identity',
        'ignore',
        'Int',
        'invariant',
        'Iterable',
        'JSON',
        'Math',
        'Option',
        'Random',
        'Record',
        'Ref',
        'Result',
        'shallowEqual',
        'String',
        'Symbol',
        'Task',
        'throwError',
        'Time',
        'TimeDuration',
        'unsafeRun',
        'unsafeRunOk',
        'warning',
      ].sort()
    );
  });
});
