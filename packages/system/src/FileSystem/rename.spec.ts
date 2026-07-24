import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';
import { rename } from './rename.js';

describe(rename, () => {
  const expectTask = withTask(expect);
  it('should call fs.promises.rename', async () => {
    const renameMocked = vi.spyOn(Internal.FS, 'rename').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = rename(...args);
    await expectTask(task).toResolveAsync(undefined);
    expect(renameMocked).toHaveBeenCalledWith(...args);
  });
});
