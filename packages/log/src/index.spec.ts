import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).toSorted()).toEqual(
      [
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
      ].toSorted(),
    );
  });
});
