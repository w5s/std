import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { readSymbolicLink } from './readSymbolicLink.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe(readSymbolicLink, () => {
  const expectTask = withTask(expect);

  it('should call fs.promises.readLink', async () => {
    const readLinkMocked = vi
      .spyOn(Internal.FS, 'readlink')
      .mockImplementation(() => Promise.resolve(FilePath('path')));
    const args = [FilePath('target'), { encoding: 'utf8' }] as const;
    const task = readSymbolicLink(...args);
    await expectTask(task).toResolveAsync(FilePath('path'));
    expect(readLinkMocked).toHaveBeenCalledWith(...args);
  });
});
