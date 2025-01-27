import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { copyFile } from './copyFile.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe(copyFile, () => {
  const expectTask = withTask(expect);
  it('should call fs.promises.rename', async () => {
    const copyFileMocked = vi.spyOn(Internal.FS, 'copyFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = copyFile(...args);
    await expectTask(task).toResolveAsync(undefined);
    expect(copyFileMocked).toHaveBeenCalledWith(...args);
  });
});
