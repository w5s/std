import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { createDirectory } from './createDirectory.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe(createDirectory, () => {
  const expectTask = withTask(expect);
  it('should call fs.promises.mkdir', async () => {
    const mkdirMocked = vi.spyOn(Internal.FS, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = createDirectory(...args);
    await expectTask(task).toResolveAsync(undefined);
    expect(mkdirMocked).toHaveBeenCalledWith(...args);
  });
});
