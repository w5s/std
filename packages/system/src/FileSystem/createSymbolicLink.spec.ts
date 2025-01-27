import { Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi } from 'vitest';
import { createSymbolicLink } from './createSymbolicLink.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe('createSymbolicLink', () => {
  it('should call fs.promises.symlink', async () => {
    const symlinkMocked = vi.spyOn(Internal.FS, 'symlink').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('target'), FilePath('path')] as const;
    const task = createSymbolicLink(...args);
    await expect(Task.run(task)).resolves.toEqual(Result.Ok(undefined));
    expect(symlinkMocked).toHaveBeenCalledWith(...args);
  });
});
