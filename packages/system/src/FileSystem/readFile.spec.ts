import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { Symbol } from '@w5s/core';
import { TaskCanceler } from '@w5s/task';
import { readFile } from './readFile.js';
import { FilePath } from '../FilePath.js';
import { Internal } from '../Internal.js';

describe(readFile, () => {
  const expectTask = withTask(expect);

  it('should call fs.promises.readFile', async () => {
    const readFileMocked = vi.spyOn(Internal.FS, 'readFile').mockImplementation(async () => 'content');
    const args = [FilePath('myPath'), { encoding: 'utf8' }] as const;
    const task = readFile(...args);
    await expectTask(task).toResolveAsync('content');
    expect(readFileMocked).toHaveBeenCalledWith(
      FilePath('myPath'),
      expect.objectContaining({ encoding: 'utf8' }),
    );
  });

  it('should be cancelable', async () => {
    let aborted = false;
    vi.spyOn(Internal.FS, 'readFile').mockImplementation((_file: any, options: any) =>
      new Promise((resolve) => {
        options.signal.addEventListener('abort', () => {
          aborted = true;
          resolve('');
        });
      }),
    );

    const canceler = new TaskCanceler();
    const task = readFile(FilePath('myPath'));
    task[Symbol.run]({
      resolve: () => {},
      reject: () => {},
      canceler,
    });

    canceler.cancel();
    expect(aborted).toBe(true);
  });
});
