import { Result, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { copyFile } from './copyFile.js';
import { FilePath } from '../filePath.js';
import { Internal } from '../internal.js';

describe('copyFile', () => {
  it('should call fs.promises.rename', async () => {
    const copyFileMocked = vi.spyOn(Internal.FS, 'copyFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = copyFile(...args);
    await expect(unsafeRun(task)).resolves.toEqual(Result.Ok(undefined));
    expect(copyFileMocked).toHaveBeenCalledWith(...args);
  });
});
