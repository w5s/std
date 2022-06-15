import { describe, test, expect } from '@jest/globals';
import * as Module from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'FileSystem',
        'FilePath',
        'FileSize',
        'FileError',
        'FileErrorType',
        'Process',
        'default',
      ].sort()
    );
  });
});
