import * as Std from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'Math',
        'Array',
        'assertNever',
        'assertType',
        'assign',
        'constant',
        'Console',
        'DataObject',
        'DataError',
        'Dict',
        'extend',
        'default', // FIXME: no key exist in reality
        'Hash',
        'Int',
        'identity',
        'invariant',
        'Iterable',
        'JSON',
        'objectId',
        'Option',
        'pipe',
        'Ref',
        'Random',
        'Result',
        'runTask',
        'throwError',
        'Task',
        'Time',
        'TimeDuration',
      ].sort()
    );
  });
});
