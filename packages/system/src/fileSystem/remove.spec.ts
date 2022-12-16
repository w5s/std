import { Result } from '@w5s/core';
import { describe, it, expect, jest } from '@jest/globals';
import { remove } from './remove.js';
import { FilePath } from '../filePath.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

describe(remove, () => {
  it('should call fs.promises.rm', async () => {
    const removeMocked = jest.spyOn(Internal.FS, 'rm').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = remove(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(removeMocked).toHaveBeenCalledWith(...args);
  });
});
