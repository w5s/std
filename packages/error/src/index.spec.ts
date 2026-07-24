import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
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
      ]),
    );
  });
});
