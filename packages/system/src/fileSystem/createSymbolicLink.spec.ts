import { Result } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { createSymbolicLink } from './createSymbolicLink.js';
import { FilePath } from '../filePath.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

describe('createSymbolicLink', () => {
  it('should call fs.promises.symlink', async () => {
    const symlinkMocked = vi.spyOn(Internal.FS, 'symlink').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('target'), FilePath('path')] as const;
    const task = createSymbolicLink(...args);
    await expectTask(task).result.resolves.toEqual(Result.Ok(undefined));
    expect(symlinkMocked).toHaveBeenCalledWith(...args);
  });
});
