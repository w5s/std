import { FileSystem } from './fileSystem';

describe('FileSystem', () => {
  test('exports', () => {
    expect(Object.keys(FileSystem).sort()).toEqual(
      [
        // List of all public exports
        'copyFile',
        'createDirectory',
        'emptyDirectory',
        'ensureDirectory',
        'ensureFile',
        'ensureSymbolicLink',
        'listDirectory',
        'remove',
        'rename',
      ].sort()
    );
  });
});
