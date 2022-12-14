import { describe, it, expect } from '@jest/globals';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'LogLevel',
        'LogMessage',
        'LogRecord',
        'LogHandler',
        'default', // FIXME: no key exist in reality
      ].sort()
    );
  });
});
