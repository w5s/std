import * as Module from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'FileSystem',
        'FilePath',
        'FileError',
        'FileErrorType',
        'Process',
        'default',
      ].sort()
    );
  });
});
