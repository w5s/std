import { Result } from '@w5s/core';
import { describe, it, expect, jest } from '@jest/globals';
import { listDirectory } from './listDirectory.js';
import { FilePath } from '../filePath.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

describe(listDirectory, () => {
  it('should call fs.promises.readdir', async () => {
    const readdirMocked = jest
      .spyOn(Internal.FS, 'readdir')
      .mockImplementation(() => Promise.resolve(['file1', 'file2'] as any));
    const args = [FilePath('anyPath'), 'utf8'] as const;
    const task = listDirectory(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(['file1', 'file2']));
    expect(readdirMocked).toHaveBeenCalledWith(...args);
  });
});
