import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'application',
        'DatabaseError',
        'DatabaseDriver',
        'SQLDataType',
        'SQLQuery',
        'SQLStatement',
        'sql',
        'executeQuery',
      ].sort(),
    );
  });
});
