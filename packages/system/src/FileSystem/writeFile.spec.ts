import { Symbol } from '@w5s/core';
import { TaskCanceler } from '@w5s/task';
import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';
import { writeFile } from './writeFile.js';

describe(writeFile, () => {
  const expectTask = withTask(expect);

  it('should call fs.promises.writeFile', async () => {
    const writeFileMocked = vi.spyOn(Internal.FS, 'writeFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), '', { encoding: 'utf8' }] as const;
    const task = writeFile(...args);
    await expectTask(task).toResolveAsync(undefined);
    expect(writeFileMocked).toHaveBeenCalledWith(
      FilePath('oldPath'),
      '',
      expect.objectContaining({ encoding: 'utf8' }),
    );
  });
  it('should be cancelable', async () => {
    let fileContent = '';
    vi.spyOn(Internal.FS, 'writeFile').mockImplementation(async (_file, content: any, options: any) => {
      for (const contentChar of content) {
        if (options.signal.aborted) {
          return;
        }
        fileContent += contentChar;
      }
    });
    let index = 0;
    const canceler = new TaskCanceler();
    const content: Iterable<string> = {
      [Symbol.iterator]: () => ({
        next: () => {
          const currentIndex = index;
          index += 1;
          let value = currentIndex.toString(16);
          if (currentIndex > 9) {
            canceler.cancel();

            value = 'X';
          }
          if (currentIndex >= 16) {
            return { done: true, value };
          }
          return {
            done: false,
            value,
          };
        },
      }),
    };
    const task = writeFile(FilePath('oldPath'), content);
    task[Symbol.run]({
      canceler,
      reject: () => {},
      resolve: () => {},
    });
    expect(fileContent).toEqual('0123456789');
  });
});
