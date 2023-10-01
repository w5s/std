import { Result, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { errnoExceptionHandler, Internal } from './internal.js';
import { FilePath } from './filePath.js';
import { Process } from './process.js';
import { anyErrnoException } from './_test/config.js';

describe('Process', () => {
  describe('.exit', () => {
    it('should call process.exit', () => {
      const processExit = vi.spyOn(Internal.Process, 'exit').mockImplementation(
        () =>
          // do nothing
          undefined as never
      );
      const exitTask = Process.exit(0);
      expect(unsafeRun(exitTask)).toEqual(Result.Ok(undefined));
      expect(processExit).toHaveBeenCalledWith(0);
    });
  });
  describe('.getCurrentDirectory', () => {
    const mocked = vi.spyOn(Internal.Process, 'cwd');
    it('should call process.cwd', () => {
      mocked.mockImplementation(() => FilePath('/my/dir'));
      const task = Process.getCurrentDirectory();
      expect(unsafeRun(task)).toEqual(Result.Ok(FilePath('/my/dir')));
      expect(mocked).toHaveBeenCalled();
    });
  });
  describe('.setCurrentDirectory', () => {
    const mocked = vi.spyOn(Internal.Process, 'chdir');
    it('should call process.chdir', () => {
      mocked.mockImplementation(() => undefined);
      const task = Process.setCurrentDirectory(FilePath('/my/dir'));
      expect(unsafeRun(task)).toEqual(Result.Ok(undefined));
      expect(mocked).toHaveBeenCalledWith('/my/dir');
    });
    it('should handle errors', () => {
      mocked.mockImplementation(() => {
        throw anyErrnoException;
      });
      const task = Process.setCurrentDirectory(FilePath('/my/dir'));
      expect(unsafeRun(task)).toEqual(Result.Error(errnoExceptionHandler(anyErrnoException)));
    });
  });
});
