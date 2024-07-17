import { Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi } from 'vitest';
import { createDirectory } from './createDirectory.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe('createDirectory', () => {
  it('should call fs.promises.mkdir', async () => {
    const mkdirMocked = vi.spyOn(Internal.FS, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = createDirectory(...args);
    await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Ok(undefined));
    expect(mkdirMocked).toHaveBeenCalledWith(...args);
  });
});
