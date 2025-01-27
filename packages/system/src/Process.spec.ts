import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { errnoExceptionHandler } from './Internal.js';
import { FilePath } from './FilePath.js';
import { Process } from './Process.js';
import { anyErrnoException } from './_test/config.js';

describe('Process', () => {
  const expectTask = withTask(expect);

  describe(Process.exit, () => {
    it('should call process.exit', () => {
      const processExit = vi.spyOn(process, 'exit').mockImplementation(
        () =>
          // do nothing
          undefined as never,
      );
      const exitTask = Process.exit(0);
      expectTask(exitTask).toResolveSync(undefined);
      expect(processExit).toHaveBeenCalledWith(0);
    });
  });
  describe('.getCurrentDirectory', () => {
    const mocked = vi.spyOn(process, 'cwd');
    it('should call process.cwd', () => {
      mocked.mockImplementation(() => FilePath('/my/dir'));
      const task = Process.getCurrentDirectory();
      expectTask(task).toResolveSync(FilePath('/my/dir'));
      expect(mocked).toHaveBeenCalled();
    });
  });
  describe('.setCurrentDirectory', () => {
    const mocked = vi.spyOn(process, 'chdir');
    it('should call process.chdir', () => {
      mocked.mockImplementation(() => undefined);
      const task = Process.setCurrentDirectory(FilePath('/my/dir'));
      expectTask(task).toResolveSync(undefined);
      expect(mocked).toHaveBeenCalledWith('/my/dir');
    });
    it('should handle errors', () => {
      mocked.mockImplementation(() => {
        throw anyErrnoException;
      });
      const task = Process.setCurrentDirectory(FilePath('/my/dir'));
      expectTask(task).toRejectSync(errnoExceptionHandler(anyErrnoException));
    });
  });
});
