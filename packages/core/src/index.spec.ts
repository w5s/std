import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'AggregateError',
        'ArgumentError',
        'Array',
        'assign',
        'AsyncDisposable',
        'Boolean',
        'cancel',
        'Comparable',
        'Console',
        'DataError',
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
        'Time',
        'TimeDuration',
        'unsafeRun',
        'unsafeRunOk',
      ].sort()
    );
  });
});
