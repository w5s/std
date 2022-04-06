import { FileSystem } from './system';

describe('FileSystem', () => {
  test('exports', () => {
    expect(Object.keys(FileSystem).sort()).toEqual(
      [
        // List of all public exports
        'ensureDirectory',
        'ensureDirectorySync',
      ].sort()
    );
  });
});
