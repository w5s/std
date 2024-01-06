import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Std).sort()).toEqual(
      [
        'ArgumentError',
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
});
