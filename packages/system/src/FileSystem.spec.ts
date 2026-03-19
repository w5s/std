import { describe, it, expect } from 'vitest';
import { FileSystem } from './FileSystem.js';

describe('FileSystem', () => {
  it('exports', () => {
    expect(Object.keys(FileSystem).toSorted()).toEqual(
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
        'readFile',
        'readFileStatus',
        'readSymbolicLink',
        'readSymbolicLinkStatus',
        'move',
        'remove',
        'rename',
        'writeFile',
      ].toSorted(),
    );
  });
});
