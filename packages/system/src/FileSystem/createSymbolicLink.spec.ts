import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { createSymbolicLink } from './createSymbolicLink.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe(createSymbolicLink, () => {
  const expectTask = withTask(expect);
  it('should call fs.promises.symlink', async () => {
    const symlinkMocked = vi.spyOn(Internal.FS, 'symlink').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('target'), FilePath('path')] as const;
    const task = createSymbolicLink(...args);
    await expectTask(task).toResolveAsync(undefined);
    expect(symlinkMocked).toHaveBeenCalledWith(...args);
  });
});
