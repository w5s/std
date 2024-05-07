import { Result, Task } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { remove } from './remove.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe('remove', () => {
  it('should call fs.promises.rm', async () => {
    const removeMocked = vi.spyOn(Internal.FS, 'rm').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = remove(...args);
    await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Ok(undefined));
    expect(removeMocked).toHaveBeenCalledWith(...args);
  });
});
