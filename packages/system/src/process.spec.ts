import { Result } from '@w5s/core';
import { errnoExceptionHandler, Internal } from './internal';
import { FilePath } from './path';
import { Process } from './process';
import { anyErrnoException, expectTask } from './_test/config';

describe('Process', () => {
  describe(Process.exit, () => {
    test('should call process.exit', () => {
      const processExit = jest.spyOn(Internal.Process, 'exit').mockImplementation(
        () =>
          // do nothing
          undefined as never
      );
      const exitTask = Process.exit(0);
      expectTask(exitTask).result.toEqual(Result.Ok(undefined));
      expect(processExit).toHaveBeenCalledWith(0);
    });
  });
  describe(Process.getCurrentDirectory, () => {
    const mocked = jest.spyOn(Internal.Process, 'cwd');
    test('should call process.cwd', () => {
      mocked.mockImplementation(() => FilePath('/my/dir'));
      const task = Process.getCurrentDirectory();
      expectTask(task).result.toEqual(Result.Ok(FilePath('/my/dir')));
      expect(mocked).toHaveBeenCalled();
    });
  });
  describe(Process.setCurrentDirectory, () => {
    const mocked = jest.spyOn(Internal.Process, 'chdir');
    test('should call process.chdir', () => {
      mocked.mockImplementation(() => undefined);
      const task = Process.setCurrentDirectory(FilePath('/my/dir'));
      expectTask(task).result.toEqual(Result.Ok(undefined));
      expect(mocked).toHaveBeenCalledWith('/my/dir');
    });
    test('should handle errors', () => {
      mocked.mockImplementation(() => {
        throw anyErrnoException;
      });
      const task = Process.setCurrentDirectory(FilePath('/my/dir'));
      expectTask(task).result.toEqual(Result.Error(errnoExceptionHandler(anyErrnoException)));
    });
  });
});
