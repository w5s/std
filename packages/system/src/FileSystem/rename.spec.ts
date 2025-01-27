import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { rename } from './rename.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

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
