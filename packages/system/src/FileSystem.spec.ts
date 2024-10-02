import { describe, it, expect } from 'vitest';
import { FileSystem } from './FileSystem.js';

describe('FileSystem', () => {
  it('exports', () => {
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
      ].sort(),
    );
  });
});
