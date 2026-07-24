import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        'configuration',
        'DatabaseDriver',
        'DatabaseError',
        'executeQuery',
        // List of all public exports
        'meta',
        'sql',
        'SQLDataType',
        'SQLQuery',
        'SQLStatement',
      ]),
    );
  });
});
