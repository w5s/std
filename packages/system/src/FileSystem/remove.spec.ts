import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { remove } from './remove.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

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
