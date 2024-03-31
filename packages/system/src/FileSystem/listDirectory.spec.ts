import { Result, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { listDirectory } from './listDirectory.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe('listDirectory', () => {
  it('should call fs.promises.readdir', async () => {
    const readdirMocked = vi
      .spyOn(Internal.FS, 'readdir')
      .mockImplementation(() => Promise.resolve(['file1', 'file2'] as any));
    const args = [FilePath('anyPath'), 'utf8'] as const;
    const task = listDirectory(...args);
    await expect(unsafeRun(task)).resolves.toEqual(Result.Ok(['file1', 'file2']));
    expect(readdirMocked).toHaveBeenCalledWith(...args);
  });
});
