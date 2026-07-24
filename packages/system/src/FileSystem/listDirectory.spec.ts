import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';
import { listDirectory } from './listDirectory.js';

describe(listDirectory, () => {
  const expectTask = withTask(expect);

  it('should call fs.promises.readdir', async () => {
    const readdirMocked = vi
      .spyOn(Internal.FS, 'readdir')
      .mockImplementation(() => Promise.resolve(['file1', 'file2'] as any));
    const args = [FilePath('anyPath'), 'utf8'] as const;
    const task = listDirectory(...args);
    await expectTask(task).toResolveAsync(['file1', 'file2']);
    expect(readdirMocked).toHaveBeenCalledWith(...args);
  });
});
