import { Result, cancel, unsafeRun, type TaskCanceler } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { writeFile } from './writeFile.js';
import { FilePath } from '../filePath.js';
import { Internal } from '../internal.js';

describe('writeFile', () => {
  it('should call fs.promises.writeFile', async () => {
    const writeFileMocked = vi.spyOn(Internal.FS, 'writeFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), '', { encoding: 'utf8' }] as const;
    const task = writeFile(...args);
    await expect(unsafeRun(task)).resolves.toEqual(Result.Ok(undefined));
    expect(writeFileMocked).toHaveBeenCalledWith(
      FilePath('oldPath'),
      '',
      expect.objectContaining({ encoding: 'utf8' })
    );
  });
  it('should be cancelable', async () => {
    let fileContent = '';
    vi.spyOn(Internal.FS, 'writeFile').mockImplementation(async (_file, content: any, options: any) => {
      for (const contentChar of content) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (options.signal.aborted) {
          return;
        }
        fileContent += contentChar;
      }
    });
    let index = 0;
    const cancelerRef: TaskCanceler = { current: undefined };
    const content: Iterable<string> = {
      [Symbol.iterator]: () => ({
        next: () => {
          const currentIndex = index;
          index += 1;
          let value = currentIndex.toString(16);
          if (currentIndex > 9) {
            cancel(cancelerRef);
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
    task.taskRun({
      resolve: () => {},
      reject: () => {},
      canceler: cancelerRef,
      run: unsafeRun,
    });
    expect(fileContent).toEqual('0123456789');
  });
});
