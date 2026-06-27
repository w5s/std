import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        // List of all public exports
        'meta',
        'configuration',
        'Log',
        'LogLevel',
        'LogMessage',
        'LogMessageRef',
        'LogMessageItem',
        'LogRecord',
        'LogHandler',
        'level',
        'critical',
        'error',
        'warn',
        'info',
        'debug',
      ]),
    );
  });
});
