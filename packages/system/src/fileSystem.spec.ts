import { FileSystem } from './fileSystem';

describe('FileSystem', () => {
  test('exports', () => {
    expect(Object.keys(FileSystem).sort()).toEqual(
      [
        // List of all public exports
        'copyFile',
        'createDirectory',
        'createSymbolicLink',
        'emptyDirectory',
        'ensureDirectory',
        'ensureFile',
        'ensureSymbolicLink',
        'listDirectory',
        'readFileStatus',
        'readSymbolicLink',
        'readSymbolicLinkStatus',
        'move',
        'remove',
        'rename',
        'writeFile',
      ].sort()
    );
  });
});
