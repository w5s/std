import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        'configuration',
        'critical',
        'debug',
        'error',
        'info',
        'level',
        'Log',
        'LogHandler',
        'LogLevel',
        'LogMessage',
        'LogMessageItem',
        'LogMessageRef',
        'LogRecord',
        // List of all public exports
        'meta',
        'warn',
      ]),
    );
  });
});
