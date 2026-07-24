import { describe, expect, it } from 'vitest';

import { FileSystem } from './FileSystem.js';

describe('FileSystem', () => {
  it('exports', () => {
    expect(new Set(Object.keys(FileSystem))).toEqual(
      new Set([
        // List of all public exports
        'copyFile',
        'createDirectory',
        'createSymbolicLink',
        'emptyDirectory',
        'ensureDirectory',
        'ensureFile',
        'ensureSymbolicLink',
        'listDirectory',
        'move',
        'readFile',
        'readFileStatus',
        'readSymbolicLink',
        'readSymbolicLinkStatus',
        'remove',
        'rename',
        'writeFile',
      ]),
    );
  });
});
