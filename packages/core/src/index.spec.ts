import { describe, test, expect } from '@jest/globals';
import * as Std from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'Math',
        'Array',
        'AggregateError',
        'ArgumentError',
        'assertNever',
        'assertType',
        'assign',
        'constant',
        'Console',
        'DataObject',
        'DataError',
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
        'throwError',
        'Task',
        'Time',
        'TimeDuration',
        'warning',
      ].sort()
    );
  });
});
