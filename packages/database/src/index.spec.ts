import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        // List of all public exports
        'meta',
        'configuration',
        'DatabaseError',
        'DatabaseDriver',
        'SQLDataType',
        'SQLQuery',
        'SQLStatement',
        'sql',
        'executeQuery',
      ]),
    );
  });
});
