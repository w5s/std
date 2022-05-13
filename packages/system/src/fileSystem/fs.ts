import { Option, Task, Array } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error';
import { Internal } from '../internal';
import { FilePath } from '../path';

export type ErrnoException = NodeJS.ErrnoException;
export const ErrnoException = {
  hasInstance(anyValue: unknown): anyValue is ErrnoException {
    return isError(anyValue);
  },
};

export function taskCreator<A extends unknown[], R>(fn: (...args: A) => R | Promise<R>) {
  return (...args: A) =>
    Task(async ({ ok, error }) => {
      try {
        return ok(await fn(...args));
      } catch (error_: unknown) {
        return error(errnoExceptionHandler(error_));
      }
    });
}

/**
 * Converts an ErrnoException to a FileError.
 */
export function errnoExceptionHandler(error: unknown): FileError {
  return FileError.hasInstance(error)
    ? error
    : ErrnoException.hasInstance(error)
    ? FileError({
        fileErrorType: 'OtherError',
        path: error.path as FilePath,
        cause: error,
        syscall: error.syscall,
        errno: error.errno,
        code: error.code,
      })
    : FileError({
        fileErrorType: 'OtherError',
        path: Option.None,
        cause: error,
        syscall: Option.None,
        errno: Option.None,
        code: Option.None,
      });
}

export function listDirectory(filePath: FilePath, options?: listDirectory.Options): Task<Array<FilePath>, FileError> {
  // @ts-ignore - `readdir` returns an array of strings instead of a Array<FilePath>
  return taskCreator<[path: nodeFS.PathLike, options?: BufferEncoding], string[]>(Internal.FS.readdir)(
    filePath,
    options
  );
}
export namespace listDirectory {
  export type Options = BufferEncoding;
}

export const lstat = taskCreator<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  Internal.FS.lstat(pathLike, { bigint: false })
);
export const stat = taskCreator<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  Internal.FS.stat(pathLike, { bigint: false })
);
export const mkdir = taskCreator(Internal.FS.mkdir);
export const writeFile = taskCreator(Internal.FS.writeFile);
export const symlink = taskCreator(Internal.FS.symlink);

export function copyFile(source: FilePath, destination: FilePath): Task<void, FileError> {
  return taskCreator(Internal.FS.copyFile)(source, destination);
}

export function rename(oldPath: FilePath, newPath: FilePath): Task<void, FileError> {
  return taskCreator(Internal.FS.rename)(oldPath, newPath);
}

export function remove(filePath: FilePath, options?: remove.Options): Task<void, FileError> {
  return taskCreator(Internal.FS.rm)(filePath, options);
}
export namespace remove {
  export type Options = nodeFS.RmOptions;
}

function isError(anyValue: unknown): anyValue is Error {
  return Object.prototype.toString.call(anyValue) === '[object Error]';
}
