import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';
import { remove } from './remove.js';

describe(remove, () => {
  const expectTask = withTask(expect);
  it('should call fs.promises.rm', async () => {
    const removeMocked = vi.spyOn(Internal.FS, 'rm').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = remove(...args);
    await expectTask(task).toResolveAsync(undefined);
    expect(removeMocked).toHaveBeenCalledWith(...args);
  });
});
