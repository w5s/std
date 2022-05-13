import { FileSystem } from './fileSystem';

describe('FileSystem', () => {
  test('exports', () => {
    expect(Object.keys(FileSystem).sort()).toEqual(
      [
        // List of all public exports
        'emptyDirectory',
        'ensureDirectory',
        'ensureFile',
        'ensureSymbolicLink',
        'copyFile',
        'listDirectory',
        'remove',
        'rename',
      ].sort()
    );
  });
});
