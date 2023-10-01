import { Result, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { createDirectory } from './createDirectory.js';
import { FilePath } from '../filePath.js';
import { Internal } from '../internal.js';

describe('createDirectory', () => {
  it('should call fs.promises.mkdir', async () => {
    const mkdirMocked = vi.spyOn(Internal.FS, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = createDirectory(...args);
    await expect(unsafeRun(task)).resolves.toEqual(Result.Ok(undefined));
    expect(mkdirMocked).toHaveBeenCalledWith(...args);
  });
});
