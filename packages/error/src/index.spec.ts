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
        'CustomError',
        'Error',
        'ErrorClass',
        'EvalError',
        'invariant',
        'InvariantError',
        'isDOMException',
        'isError',
        'NotImplementedError',
        'panic',
        'RangeError',
        'ReferenceError',
        'RuntimeError',
        'SyntaxError',
        'TimeoutError',
        'TypeError',
        'URIError',
        'warning',
      ].sort(),
    );
  });
});
