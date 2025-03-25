import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        'AbortError',
        'AggregateError',
        'ArgumentError',
        'assertNever',
        'Error',
        'ErrorClass',
        'EvalError',
        'invariant',
        'isError',
        'InvariantError',
        'NotImplementedError',
        'RangeError',
        'ReferenceError',
        'RuntimeError',
        'SyntaxError',
        'throwError',
        'TimeoutError',
        'TypeError',
        'URIError',
        'warning',
      ].sort(),
    );
  });
});
