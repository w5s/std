import { Result, Task } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { rename } from './rename.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe('rename', () => {
  it('should call fs.promises.rename', async () => {
    const renameMocked = vi.spyOn(Internal.FS, 'rename').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = rename(...args);
    await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Ok(undefined));
    expect(renameMocked).toHaveBeenCalledWith(...args);
  });
});
