import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';
import { readSymbolicLink } from './readSymbolicLink.js';

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
