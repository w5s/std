import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toMatchInlineSnapshot(`
      [
        "AggregateError",
        "ArgumentError",
        "CustomError",
        "Error",
        "EvalError",
        "InvariantError",
        "NotImplementedError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TimeoutError",
        "TypeError",
        "URIError",
        "assertNever",
        "invariant",
        "throwError",
        "warning",
      ]
    `);
  });
});
