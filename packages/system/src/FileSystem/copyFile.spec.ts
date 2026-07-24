import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';
import { copyFile } from './copyFile.js';

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
