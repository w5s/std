import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        // List of all public exports
        'DeviceID',
        'FileError',
        'FileErrorType',
        'FileID',
        'FilePath',
        'FileSize',
        'FileStatus',
        'FileSystem',
        'GroupID',
        'Process',
        'UserID',
      ]),
    );
  });
});
