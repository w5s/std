import { Result } from '@w5s/core';
import { describe, it, expect, jest } from '@jest/globals';
import { readSymbolicLink } from './readSymbolicLink.js';
import { FilePath } from '../filePath.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

describe('readSymbolicLink', () => {
  it('should call fs.promises.readLink', async () => {
    const readLinkMocked = jest
      .spyOn(Internal.FS, 'readlink')
      .mockImplementation(() => Promise.resolve(FilePath('path')));
    const args = [FilePath('target'), { encoding: 'utf8' }] as const;
    const task = readSymbolicLink(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(FilePath('path')));
    expect(readLinkMocked).toHaveBeenCalledWith(...args);
  });
});
